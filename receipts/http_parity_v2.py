#!/usr/bin/env python3
"""liefbuilders.com live vs local parity, v2. Read-only: GET, HEAD and one CORS
preflight (OPTIONS) to the lead webhook. It never POSTs to the webhook.
Usage: http_parity_v2.py <live_base> <local_base> <paths_file>
Parts: A) status+Location(with query)+headers, GET and HEAD, every path.
       B) browser navigation load and refresh (304), hashed asset resolution.
       C) contact form evidence (static + headers + preflight only)."""
import gzip, hashlib, http.client, re, sys, urllib.parse, zlib

CHROME = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
          '(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36')
NAV = {'User-Agent': CHROME,
       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
       'Accept-Language': 'en-US,en;q=0.9', 'Accept-Encoding': 'gzip, deflate',
       'Sec-Fetch-Mode': 'navigate', 'Sec-Fetch-Dest': 'document', 'Sec-Fetch-Site': 'none',
       'Sec-Fetch-User': '?1', 'Upgrade-Insecure-Requests': '1'}

def req(base, path, method='GET', headers=None):
    u = urllib.parse.urlsplit(base)
    C = http.client.HTTPSConnection if u.scheme == 'https' else http.client.HTTPConnection
    c = C(u.netloc, timeout=30)
    c.request(method, path, headers=headers or {'User-Agent': 'cg-migration-parity/2'})
    r = c.getresponse()
    body = r.read()
    h = {k.lower(): v for k, v in r.getheaders()}
    ce = h.get('content-encoding', '')
    if ce == 'gzip': body = gzip.decompress(body)
    elif ce == 'deflate': body = zlib.decompress(body)
    c.close()
    return r.status, h, body

def norm_loc(loc):
    if loc.startswith('http'):
        loc = urllib.parse.urlsplit(loc)._replace(scheme='', netloc='').geturl()
    return loc

def ct(h): return h.get('content-type', '').split(';')[0].strip()

# ---------------- Part A
def part_a(live, local, paths):
    print('=' * 70); print('PART A: redirects, aliases, case, query strings, GET and HEAD on every path'); print('=' * 70)
    n = same = core_same = 0
    rows = []
    for p in paths:
        for m in ('GET', 'HEAD'):
            sa, ha, ba = req(live, p, m); sb, hb, bb = req(local, p, m)
            la, lb = norm_loc(ha.get('location', '')), norm_loc(hb.get('location', ''))
            redirect = sa in (301, 302, 303, 307, 308) or sb in (301, 302, 303, 307, 308)
            sha_a = hashlib.sha1(ba).hexdigest()[:10] if (m == 'GET' and sa == 200) else '-'
            sha_b = hashlib.sha1(bb).hexdigest()[:10] if (m == 'GET' and sb == 200) else '-'
            core = {'status': (sa, sb), 'location': (la, lb), 'sha1': (sha_a, sha_b)}
            if not redirect: core['content-type'] = (ct(ha), ct(hb))
            core_d = {k: v for k, v in core.items() if v[0] != v[1]}
            sec = {k: (ha.get(k, ''), hb.get(k, '')) for k in ('cache-control', 'x-robots-tag')}
            if redirect: sec['content-type'] = (ct(ha), ct(hb))
            sec_d = {k: v for k, v in sec.items() if v[0] != v[1]}
            n += 1
            if not core_d: core_same += 1
            if not core_d and not sec_d: same += 1
            tag = 'ok  ' if not core_d and not sec_d else ('DIFF' if core_d else 'hdr ')
            print(f'{tag} {m:4} {p:34} live {sa} {la or sha_a}  local {sb} {lb or sha_b}')
            if core_d: print('       CORE DIFF', core_d)
            if sec_d: print('       header diff (non-core)', sec_d)
    print(f'\nPART A SUMMARY: {n} requests; {core_same} identical on status+Location+body hash+content-type; '
          f'{same} identical on every compared header too; {n - core_same} core differences')
    return n, core_same, same

# ---------------- Part B
class A(object):
    pass

def assets_in(html):
    urls = set(re.findall(r'(?:href|src)="(/[^"#?]*\.(?:css|js|png|svg|jpg|jpeg|webp|ico|woff2?|xml|txt))"', html))
    urls |= set(re.findall(r'(?:href|src)="(/assets/[^"]+)"', html))
    return sorted(urls)

def part_b(live, local, routes):
    print('\n' + '=' * 70); print('PART B: browser navigation load, refresh (304), asset resolution'); print('=' * 70)
    ok = bad = 0
    asset_ct_live = {}
    for r in routes:
        res = {}
        for name, base in (('live', live), ('local', local)):
            s1, h1, b1 = req(base, r, 'GET', dict(NAV))
            rh = dict(NAV, **{'Cache-Control': 'max-age=0', 'Sec-Fetch-Site': 'same-origin'})
            if 'etag' in h1: rh['If-None-Match'] = h1['etag']
            if 'last-modified' in h1: rh['If-Modified-Since'] = h1['last-modified']
            s2, h2, b2 = req(base, r, 'GET', rh)
            # also a hard refresh with no validators
            s3, h3, b3 = req(base, r, 'GET', dict(NAV, **{'Cache-Control': 'no-cache', 'Pragma': 'no-cache'}))
            html = b1.decode('utf8', 'replace') if s1 == 200 or s1 == 404 else ''
            assets = assets_in(html)
            ares = {}
            for a in assets:
                sa, ha, ba = req(base, a)
                ares[a] = (sa, ct(ha))
            res[name] = dict(s1=s1, ct=ct(h1), sha=hashlib.sha1(b1).hexdigest()[:10], etag=bool(h1.get('etag')),
                             lm=bool(h1.get('last-modified')), cc=h1.get('cache-control', ''), s2=s2,
                             b2len=len(b2), s3=s3, sha3=hashlib.sha1(b3).hexdigest()[:10], assets=ares,
                             enc=h1.get('content-encoding', 'none'))
        L, K = res['live'], res['local']
        same_first = (L['s1'], L['ct'], L['sha']) == (K['s1'], K['ct'], K['sha'])
        same_refresh = (L['s2'], K['s2']) and L['s2'] == K['s2']
        same_hard = (L['s3'], L['sha3']) == (K['s3'], K['sha3'])
        # asset parity
        amis = {a for a in set(L['assets']) | set(K['assets']) if L['assets'].get(a) != K['assets'].get(a)}
        asset_bad = [a for a, v in K['assets'].items() if v[0] != 200]
        good = same_first and same_refresh and same_hard and not amis and not asset_bad
        ok += good; bad += (not good)
        print(f"{'ok  ' if good else 'DIFF'} {r:22} first: live {L['s1']} {L['sha']} / local {K['s1']} {K['sha']} ({K['ct']}) | "
              f"refresh: live {L['s2']} / local {K['s2']} | hard reload: live {L['s3']} / local {K['s3']} same body {L['sha3'] == K['sha3']}")
        print(f"       validators live etag={L['etag']} lm={L['lm']} cc='{L['cc']}' | local etag={K['etag']} lm={K['lm']} cc='{K['cc']}' | encoding live={L['enc']} local={K['enc']}")
        print(f"       assets referenced: live {len(L['assets'])}, local {len(K['assets'])}; "
              f"local non-200: {asset_bad or 'none'}; live-vs-local mismatches: {sorted(amis) or 'none'}")
        for a, v in sorted(K['assets'].items()):
            print(f"         {a:48} local {v[0]} {v[1]:24} live {L['assets'].get(a, ('-', '-'))[0]} {L['assets'].get(a, ('-', '-'))[1]}")
    print(f'\nPART B SUMMARY: {ok} of {ok + bad} routes identical on load, refresh and assets')
    return ok, bad

# ---------------- Part C
def part_c(live, local):
    print('\n' + '=' * 70); print('PART C: contact form evidence (no POST, no lead created)'); print('=' * 70)
    WH = 'https://services.leadconnectorhq.com/hooks/LzgGOj1j1b3NFY8j9A9I/webhook-trigger/9510cfac-442e-43ee-b261-b3679c7cd3dc'
    s, h, b = req(live, '/')
    js = re.search(r'/assets/index-[^"]+\.js', b.decode())
    jsurl = js.group(0)
    for name, base in (('live', live), ('local', local)):
        s, h, jb = req(base, jsurl)
        t = jb.decode('utf8', 'replace')
        print(f'{name}: {jsurl} {s} sha1 {hashlib.sha1(jb).hexdigest()[:12]} contains webhook URL: {WH in t}; '
              f'count of leadconnectorhq refs: {t.count("leadconnectorhq")}; fetch POST json: {"JSON.stringify" in t}')
        for rt in ('/', '/national', '/team'):
            s, h, hb = req(base, rt)
            ht = hb.decode('utf8', 'replace')
            blk = [k for k in h if k in ('content-security-policy', 'content-security-policy-report-only',
                   'x-frame-options', 'permissions-policy', 'cross-origin-opener-policy', 'cross-origin-embedder-policy',
                   'cross-origin-resource-policy', 'referrer-policy')]
            print(f'{name} {rt}: html has <iframe: {"<iframe" in ht}; html has <form: {"<form" in ht}; '
                  f'html mentions leadconnector/msgsndr/gohighlevel: {bool(re.search("leadconnector|msgsndr|gohighlevel", ht, re.I))}; '
                  f'CSP/framing/COEP headers present: {blk or "none"}; meta CSP: {"http-equiv=\"Content-Security-Policy\"" in ht}')
    print('\nCORS preflight (OPTIONS only, creates no lead) from each origin the page could run on:')
    u = urllib.parse.urlsplit(WH)
    for origin in ('https://www.liefbuilders.com', 'https://lief-builders.example.workers.dev', 'http://127.0.0.1:8788'):
        c = http.client.HTTPSConnection(u.netloc, timeout=30)
        c.request('OPTIONS', u.path, headers={'Origin': origin, 'Access-Control-Request-Method': 'POST',
                  'Access-Control-Request-Headers': 'content-type', 'User-Agent': CHROME})
        r = c.getresponse(); r.read()
        hh = {k.lower(): v for k, v in r.getheaders()}
        print(f"  Origin {origin}: {r.status} allow-origin={hh.get('access-control-allow-origin')} "
              f"allow-methods={hh.get('access-control-allow-methods')} allow-headers={hh.get('access-control-allow-headers')}")
        c.close()

if __name__ == '__main__':
    live, local, pf = sys.argv[1:4]
    paths = [p.strip() for p in open(pf) if p.strip() and not p.startswith('#')]
    n, cs, sm = part_a(live, local, paths)
    routes = ['/', '/national', '/ai', '/sabs', '/projects', '/team', '/testimonials', '/wiki', '/wiki/common-ground', '/404']
    ok, bad = part_b(live, local, routes)
    part_c(live, local)
    sys.exit(1 if (n - cs) or bad else 0)

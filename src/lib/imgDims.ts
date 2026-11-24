// Natural pixel size of each imported image, keyed by its URL. The width and
// height attributes only reserve space before the image loads (no layout jump);
// every <img> keeps its own CSS size, so nothing renders differently.
const DIMS = new Map<string, { width: number; height: number }>();

export function sized(src: string, width: number, height: number): string {
  DIMS.set(src, { width, height });
  return src;
}

export function dimsOf(src: string | undefined): { width?: number; height?: number } {
  return (src && DIMS.get(src)) || {};
}

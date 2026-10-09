import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import TechnologyPage from "@/pages/TechnologyPage";
import SabsPage from "@/pages/SabsPage";
import ProjectsPage from "@/pages/ProjectsPage";
import TeamPage from "@/pages/TeamPage";
import TestimonialsPage from "@/pages/TestimonialsPage";
import NationalPage from "@/pages/NationalPage";

// Router-agnostic app tree. Wrapped by BrowserRouter on the client (App.tsx)
// and by StaticRouter during prerender (entry-server.tsx). Keep the two in sync.
const AppInner = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/national" element={<NationalPage />} />
      <Route path="/ai" element={<TechnologyPage />} />
      <Route path="/sabs" element={<SabsPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />
    </Route>
  </Routes>
);

export default AppInner;

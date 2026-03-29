import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import TechnologyPage from "@/pages/TechnologyPage";
import SabsPage from "@/pages/SabsPage";
import ProjectsPage from "@/pages/ProjectsPage";
import TeamPage from "@/pages/TeamPage";
import TestimonialsPage from "@/pages/TestimonialsPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<TechnologyPage />} />
        <Route path="/sabs" element={<SabsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;

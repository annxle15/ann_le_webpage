import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import LandingProject from "../pages/LandingProject";
import Work from "../pages/Work";
import Net from "../pages/Net";
import PageNotFound from "../pages/PageNotFound";
export default function SiteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/landingproject" element={<LandingProject />} />
      <Route path="/work" element={<Work />} />
      <Route path="/net" element={<Net />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

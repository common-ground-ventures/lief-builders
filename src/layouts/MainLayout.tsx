import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import { ContactModalProvider } from "@/contexts/ContactModalContext";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <ContactModalProvider>
    <div className="v2 min-h-screen overflow-x-hidden">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ContactModal />
    </div>
  </ContactModalProvider>
);

export default MainLayout;

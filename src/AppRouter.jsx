import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Room from "./pages/Room";
import PageNotFound from "./pages/PageNotFound";
import BokBokRoom from "./pages/BokBokRoom";
import PageTransition from "./components/PageTransition";
import MainLayout from "./layout/MainLayout";
import RoomLayout from "./layout/RoomLayout";
import TermsAndConditions from "./pages/Terms";
import PrivacyPolicy from "./pages/Privacy";

function App() {
  const location = useLocation();
  const isMessageRoute = location.pathname.match(/^\/room\/[a-zA-Z0-9_-]+$/);
  const Layout = isMessageRoute ? RoomLayout : MainLayout;

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/room" element={<PageTransition><Room /></PageTransition>} />
          <Route path="/room/:id" element={<PageTransition><BokBokRoom /></PageTransition>} />
          <Route path="/terms" element={<PageTransition><TermsAndConditions /></PageTransition>} />
          <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
          <Route path="*" element={<PageTransition><PageNotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./AppRouter.jsx";
import Header from "./components/Header.jsx";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <>
        <header>
          <Header />
        </header>
        <main className="mt-5 rounded-full">
          <AppRouter />
        </main>
        <footer>
          <Footer />
        </footer>
      </>
    </BrowserRouter>
  </StrictMode>,
);

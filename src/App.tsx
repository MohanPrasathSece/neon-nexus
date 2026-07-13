import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect } from "react";
import Home from "./pages/Home";
import LoggedIn from "./pages/LoggedIn";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { trackPixelEvent } from "./lib/pixel";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    // Track PageView on route changes
    trackPixelEvent("PageView");
  }, [pathname]);

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster theme="dark" position="top-center" />
      <div className="relative min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="relative flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/logged-in" element={<LoggedIn />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

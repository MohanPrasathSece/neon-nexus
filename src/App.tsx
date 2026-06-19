import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoggedIn from "./pages/LoggedIn";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
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

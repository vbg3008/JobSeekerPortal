import { useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Navbar from "./components/Navbar";
import JobList from "./components/JobList";
import AddJob from "./components/AddJob";
import EditJob from "./components/EditJob";
import KeyboardShortcutsModal from "./components/KeyboardShortcutsModal";
import { useTheme } from "./context/ThemeContext";

const App = () => {
  const location = useLocation();
  const mainRef = useRef(null);
  const { darkMode } = useTheme();

  // Initialize animations
  useGSAP(() => {
    // Animate main content with a subtle fade-in
    gsap.fromTo(
      mainRef.current,
      { opacity: 0.8 },
      { opacity: 1, duration: 0.5, ease: "power1.out" }
    );
  }, [location.pathname]); // Re-run when route changes

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      } transition-colors duration-300`}
    >
      <Navbar />
      <main ref={mainRef} className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/add" element={<AddJob />} />
          <Route path="/edit/:id" element={<EditJob />} />
        </Routes>
      </main>
      <KeyboardShortcutsModal />
    </div>
  );
};

export default App;

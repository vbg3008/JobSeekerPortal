import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { navbarAnimation, buttonHover } from "../utils/animations";
import ApiStatusIndicator from "./ApiStatusIndicator";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const navRef = useRef(null);
  const buttonRef = useRef(null);
  const [buttonTimeline, setButtonTimeline] = useState(null);
  const { darkMode } = useTheme();

  // Initialize animations
  useGSAP(() => {
    // Animate navbar on mount
    navbarAnimation(navRef.current);

    // Create button hover animation
    const timeline = buttonHover(buttonRef.current);
    setButtonTimeline(timeline);
  }, []);

  // Handle button hover
  const handleMouseEnter = () => buttonTimeline?.play();
  const handleMouseLeave = () => buttonTimeline?.reverse();

  return (
    <nav
      ref={navRef}
      className={`${
        darkMode ? "bg-blue-700" : "bg-blue-600"
      } text-white shadow-md transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold relative group">
            <span>Student Job Tracker</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <ApiStatusIndicator />
        </div>
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <Link
            to="/add"
            ref={buttonRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
              darkMode
                ? "bg-blue-500 text-white hover:bg-blue-400"
                : "bg-white text-blue-600 hover:bg-blue-50"
            }`}
          >
            Add Job
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

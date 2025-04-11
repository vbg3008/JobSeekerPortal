import { useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { gsap } from "gsap";

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const buttonRef = useRef(null);
  const sunRef = useRef(null);
  const moonRef = useRef(null);

  // Animate icon transition when theme changes
  useEffect(() => {
    // Check if refs are available
    if (!sunRef.current || !moonRef.current) return;

    if (darkMode) {
      // Animate to moon
      gsap.to(sunRef.current, {
        rotation: 45,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
      gsap.fromTo(
        moonRef.current,
        { rotation: -45, opacity: 0 },
        {
          rotation: 0,
          opacity: 1,
          duration: 0.3,
          delay: 0.1,
          ease: "power2.out",
        }
      );
    } else {
      // Animate to sun
      gsap.to(moonRef.current, {
        rotation: 45,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
      gsap.fromTo(
        sunRef.current,
        { rotation: -45, opacity: 0 },
        {
          rotation: 0,
          opacity: 1,
          duration: 0.3,
          delay: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [darkMode]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleDarkMode}
      className={`relative p-2 rounded-full ${
        darkMode
          ? "bg-gray-700 hover:bg-gray-600"
          : "bg-blue-100 hover:bg-blue-200"
      } transition-colors duration-200`}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={`Toggle ${darkMode ? "light" : "dark"} mode (t)`}
    >
      {/* Sun icon */}
      <svg
        ref={sunRef}
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${
          darkMode ? "text-gray-400 absolute" : "text-yellow-500"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        style={{ opacity: darkMode ? 0 : 1 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon icon */}
      <svg
        ref={moonRef}
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${
          darkMode ? "text-blue-300" : "text-blue-600 absolute"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        style={{ opacity: darkMode ? 1 : 0 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
};

export default ThemeToggle;

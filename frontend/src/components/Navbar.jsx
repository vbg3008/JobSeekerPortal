import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { navbarAnimation, buttonHover } from "../utils/animations";
import { useTheme } from "../context/ThemeContext";
import { useForm } from "../context/FormContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const navRef = useRef(null);
  const buttonRef = useRef(null);
  const plusIconRef = useRef(null);
  const xIconRef = useRef(null);
  const [buttonTimeline, setButtonTimeline] = useState(null);
  const { darkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const { isFormOpen, toggleForm } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize animations
  useGSAP(() => {
    // Animate navbar on mount
    navbarAnimation(navRef.current);

    // Create button hover animation if not on mobile
    if (!isMobile && buttonRef.current) {
      const timeline = buttonHover(buttonRef.current);
      setButtonTimeline(timeline);
    }
  }, [isMobile]);
  
  // Set initial icon state based on current route
  useEffect(() => {
    if (plusIconRef.current && xIconRef.current) {
      const isFormPage = location.pathname === "/add" || location.pathname.startsWith("/edit/");
      
      // Set initial states directly
      gsap.set(plusIconRef.current, { opacity: isFormPage ? 0 : 1 });
      gsap.set(xIconRef.current, { opacity: isFormPage ? 1 : 0 });
    }
  }, [location.pathname]);

  // Handle button hover
  const handleMouseEnter = () => buttonTimeline?.play();
  const handleMouseLeave = () => buttonTimeline?.reverse();

  // Handle mobile button click with animation
  const handleMobileButtonClick = () => {
    const isFormPage = location.pathname === "/add" || location.pathname.startsWith("/edit/");
    
    console.log('Button clicked, isFormPage:', isFormPage);
    console.log('Current location:', location.pathname);
    
    // Create a more dramatic animation on click
    if (isFormPage) {
      // Going from X to plus
      gsap.to(xIconRef.current, { 
        opacity: 0, 
        rotate: -90, 
        scale: 0.5,
        duration: 0.3,
        ease: "back.in(1.7)" 
      });
      gsap.to(plusIconRef.current, { 
        opacity: 1, 
        rotate: 0, 
        scale: 1,
        duration: 0.3,
        delay: 0.1,
        ease: "back.out(1.7)" 
      });
      // Add button pulse
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.15,
        yoyo: true,
        repeat: 1
      });
    } else {
      // Going from plus to X
      gsap.to(plusIconRef.current, { 
        opacity: 0, 
        rotate: 90, 
        scale: 0.5,
        duration: 0.3,
        ease: "back.in(1.7)" 
      });
      gsap.to(xIconRef.current, { 
        opacity: 1, 
        rotate: 0, 
        scale: 1,
        duration: 0.3,
        delay: 0.1,
        ease: "back.out(1.7)" 
      });
      // Add button pulse
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.15,
        yoyo: true,
        repeat: 1
      });
    }
    
    // Navigate after a short delay to allow animation to be visible
    setTimeout(() => {
      if (isFormPage) {
        navigate("/");
      } else {
        navigate("/add");
      }
      
      // Toggle form state
      toggleForm();
    }, 250);
  };

  return (
    <nav
      ref={navRef}
      className={`${darkMode ? 'bg-gray-800' : 'bg-blue-600'} text-white shadow-md transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        <Link to="/" className="text-xl font-bold relative group mr-4">
          <span className="sm:inline">
            {isMobile ? "Job Tracker" : "Student Job Tracker"}
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <div className="flex items-center space-x-2 sm:space-x-4 mt-0">
          <ThemeToggle />
          
          {isMobile ? (
            // Mobile toggle button
            <button
              ref={buttonRef}
              onClick={handleMobileButtonClick}
              className={`${darkMode 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-white text-blue-600 hover:bg-blue-50'} 
                p-0 rounded-md font-medium transition-colors duration-300 flex items-center justify-center w-[50px] h-[50px] transform-gpu will-change-transform`}
              aria-label={location.pathname === "/add" || location.pathname.startsWith("/edit/") ? "Cancel" : "Add Job"}
            >
              <div className="relative w-7 h-7 overflow-visible transform-gpu">
                {/* X icon for cancel - absolutely positioned */}
                <svg
                  ref={xIconRef}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 absolute top-0 left-0 transform-gpu"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ opacity: 0 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                
                {/* Plus icon for add - absolutely positioned */}
                <svg
                  ref={plusIconRef}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 absolute top-0 left-0 transform-gpu"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </button>
          ) : (
            // Desktop link
            <Link
              to="/add"
              ref={buttonRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`${darkMode 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-white text-blue-600 hover:bg-blue-50'} 
                px-4 py-2 rounded-md font-medium transition-colors duration-300 flex items-center justify-center`}
            >
              Add Job
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

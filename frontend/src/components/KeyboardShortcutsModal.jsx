import { useRef, useEffect } from "react";
import { useKeyboardShortcuts } from "../context/KeyboardShortcutsContext";
import { useTheme } from "../context/ThemeContext";
import { gsap } from "gsap";

const KeyboardShortcutsModal = () => {
  const { shortcuts, showShortcutsModal, setShowShortcutsModal } =
    useKeyboardShortcuts();
  const { darkMode } = useTheme();
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);

  // Handle animation when modal visibility changes
  useEffect(() => {
    // Only run animations if the modal is actually rendered in the DOM
    if (!showShortcutsModal || !backdropRef.current || !contentRef.current)
      return;

    // Animate modal in
    gsap.to(backdropRef.current, {
      opacity: 1,
      duration: 0.2,
      ease: "power1.out",
    });

    gsap.fromTo(
      contentRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.2)" }
    );

    // Cleanup function to handle animation out when component unmounts
    return () => {
      if (backdropRef.current && contentRef.current) {
        // Animate modal out
        gsap.to(backdropRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power1.in",
        });

        gsap.to(contentRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.2,
          ease: "power1.in",
        });
      }
    };
  }, [showShortcutsModal]);

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      setShowShortcutsModal(false);
    }
  };

  // Don't render anything if modal is not shown
  if (!showShortcutsModal) return null;

  return (
    <div
      ref={backdropRef}
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}
      onClick={handleBackdropClick}
      style={{ opacity: 0 }} // Start with opacity 0 for animation
    >
      <div
        ref={contentRef}
        className={`${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }
          rounded-lg shadow-xl max-w-md w-full mx-4 p-6 max-h-[90vh] overflow-y-auto`}
        style={{ opacity: 0, transform: "translateY(-20px)" }} // Start with these styles for animation
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-xl font-bold ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Keyboard Shortcuts
          </h2>
          <button
            onClick={() => setShowShortcutsModal(false)}
            className={`${
              darkMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-500 hover:text-gray-700"
            }
              transition-colors duration-200`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div
          className={`${
            darkMode ? "border-gray-700" : "border-gray-200"
          } border-b mb-4 pb-2`}
        >
          <p
            className={`${
              darkMode ? "text-gray-300" : "text-gray-600"
            } text-sm`}
          >
            Press the following key combinations to navigate and control the
            application.
          </p>
        </div>

        <div className="space-y-4">
          {Object.entries(shortcuts).map(([keys, { description }]) => (
            <div key={keys} className="flex justify-between items-center">
              <span
                className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                {description}
              </span>
              <div className="flex gap-2">
                {keys.split(" ").map((key, index) => (
                  <kbd
                    key={index}
                    className={`${
                      darkMode
                        ? "bg-gray-700 text-gray-200 border-gray-600"
                        : "bg-gray-100 text-gray-800 border-gray-300"
                    }
                      px-2 py-1 text-sm font-mono rounded border shadow-sm`}
                  >
                    {key === "escape" ? "Esc" : key.toUpperCase()}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-6 pt-4 ${
            darkMode ? "border-gray-700" : "border-gray-200"
          } border-t text-center`}
        >
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Press{" "}
            <kbd
              className={`${
                darkMode
                  ? "bg-gray-700 text-gray-200 border-gray-600"
                  : "bg-gray-100 text-gray-800 border-gray-300"
              }
              px-2 py-1 text-sm font-mono rounded border shadow-sm`}
            >
              ?
            </kbd>{" "}
            to toggle this help menu
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsModal;

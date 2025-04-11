import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create the keyboard shortcuts context
export const KeyboardShortcutsContext = createContext();

// Define available shortcuts
const SHORTCUTS = {
  "g h": { description: "Go to Home", action: (navigate) => navigate("/") },
  "g a": {
    description: "Go to Add Job",
    action: (navigate) => navigate("/add"),
  },
  "v c": { description: "View as Cards", action: null }, // Will be set in component
  "v t": { description: "View as Table", action: null }, // Will be set in component
  "?": { description: "Show Keyboard Shortcuts", action: null }, // Will be set in component
  t: { description: "Toggle Dark/Light Mode", action: null }, // Will be set by consumer
  Escape: { description: "Close Modal / Cancel", action: null }, // Will be set in component
};

// Keyboard shortcuts provider component
export const KeyboardShortcutsProvider = ({ children }) => {
  // Get navigate function from react-router
  const navigate = useNavigate();

  // State for modal and key tracking
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  const [keySequence, setKeySequence] = useState([]);
  const [keyTimeout, setKeyTimeout] = useState(null);

  // Set up actions that require hooks
  useEffect(() => {
    // These shortcuts can be set directly
    SHORTCUTS["?"].action = () => setShowShortcutsModal((prev) => !prev);
    SHORTCUTS["Escape"].action = () => setShowShortcutsModal(false);
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in an input, textarea, or select
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.tagName === "SELECT"
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      // Handle Escape key directly
      if (key === "escape") {
        SHORTCUTS["Escape"].action();
        return;
      }

      // Handle ? key directly
      if (key === "?") {
        e.preventDefault();
        SHORTCUTS["?"].action();
        return;
      }

      // For other keys, track the sequence
      clearTimeout(keyTimeout);

      // Add the key to the sequence
      const newSequence = [...keySequence, key];
      setKeySequence(newSequence);

      // Check if the sequence matches any shortcuts
      const sequenceStr = newSequence.join(" ");
      Object.entries(SHORTCUTS).forEach(([shortcut, { action }]) => {
        if (sequenceStr === shortcut && action) {
          action(navigate);
          setKeySequence([]);
          return;
        }
      });

      // Clear the sequence after a delay
      const timeout = setTimeout(() => {
        setKeySequence([]);
      }, 1000);

      setKeyTimeout(timeout);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(keyTimeout);
    };
  }, [keySequence, keyTimeout, navigate]);

  // Register actions that need to be set by consumers
  const registerActions = (actions) => {
    // Register theme toggle
    if (actions.toggleTheme) {
      SHORTCUTS["t"].action = actions.toggleTheme;
    }

    // Register view mode actions
    if (actions.setCardView) {
      SHORTCUTS["v c"].action = actions.setCardView;
    }
    if (actions.setTableView) {
      SHORTCUTS["v t"].action = actions.setTableView;
    }
  };

  return (
    <KeyboardShortcutsContext.Provider
      value={{
        shortcuts: SHORTCUTS,
        showShortcutsModal,
        setShowShortcutsModal,
        registerActions,
      }}
    >
      {children}
    </KeyboardShortcutsContext.Provider>
  );
};

// Custom hook for using the keyboard shortcuts context
export const useKeyboardShortcuts = () => {
  const context = useContext(KeyboardShortcutsContext);
  if (context === undefined) {
    throw new Error(
      "useKeyboardShortcuts must be used within a KeyboardShortcutsProvider"
    );
  }
  return context;
};

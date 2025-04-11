import { gsap } from "gsap";

// Page transition animation
export const pageTransition = (element, direction = 1) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: direction * 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    }
  );
};

// Staggered items animation (for lists)
export const staggerItems = (elements, delay = 0.1) => {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      stagger: delay,
      duration: 0.4,
      ease: "power1.out",
    }
  );
};

// Button hover animation
export const buttonHover = (element, scale = 1.05) => {
  const timeline = gsap.timeline({ paused: true });

  // Scale the button
  timeline.to(element, {
    scale: scale,
    duration: 0.2,
    ease: "power1.out",
  });

  // Find and animate the border element if it exists
  const borderElement = element.querySelector("span:last-child");
  if (borderElement) {
    timeline.to(
      borderElement,
      {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power1.out",
      },
      "-=0.2"
    ); // Start slightly before the scale animation completes
  }

  return timeline;
};

// Status badge animation
export const statusBadgePulse = (element) => {
  const timeline = gsap.timeline({ repeat: 0 });
  timeline.to(element, {
    scale: 1.1,
    duration: 0.2,
    ease: "power1.inOut",
  });
  timeline.to(element, {
    scale: 1,
    duration: 0.2,
    ease: "power1.inOut",
  });
  return timeline;
};

// Delete confirmation animation
export const deleteAnimation = (element) => {
  // Create a timeline for more complex animation
  const tl = gsap.timeline();

  // Add a slight bounce effect before zooming out
  tl.to(element, {
    scale: 1,
    duration: 0.2,
    ease: "power1.out",
  });

  // Then zoom out with a slight rotation
  tl.to(element, {
    opacity: 0,
    scale: 0,
    rotation: -5,
    duration: 0.5,
    ease: "back.in(1.7)",
    transformOrigin: "center center",
  });

  return tl;
};

// Form field focus animation
export const formFieldFocus = (element) => {
  return gsap.to(element, {
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
    duration: 0.3,
    ease: "power1.out",
  });
};

// Navbar animation
export const navbarAnimation = (element) => {
  return gsap.fromTo(
    element,
    { y: -50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
  );
};

// View toggle animation
export const viewToggleAnimation = (element, active = false) => {
  return gsap.to(element, {
    backgroundColor: active ? "#ffffff" : "transparent",
    color: active ? "#3b82f6" : "#4b5563",
    boxShadow: active ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
    duration: 0.3,
    ease: "power1.out",
  });
};

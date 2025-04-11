// This script prevents transition flashes when the page first loads
// by temporarily adding a class that disables all transitions

export const disableTransitionsOnLoad = () => {
  // Add the no-transitions class to the document
  document.documentElement.classList.add('no-transitions');
  
  // Remove the class after a short delay to allow the initial render to complete
  window.setTimeout(() => {
    document.documentElement.classList.remove('no-transitions');
  }, 100);
};

// Run the function when the module is imported
disableTransitionsOnLoad();

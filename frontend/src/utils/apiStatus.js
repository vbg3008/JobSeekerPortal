/**
 * Utility function to check if the backend API is running
 * @returns {Promise<boolean>} True if the API is running, false otherwise
 */
export const checkApiStatus = async () => {
  try {
    // Create an AbortController with a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    // Clear the timeout
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return data && data.message === "Welcome to the JobSeekerPortal API";
    }

    return false;
  } catch (error) {
    console.error("API status check failed:", error);
    return false;
  }
};

import { useState, useEffect } from "react";
import { checkApiStatus } from "../utils/apiStatus";
import { useTheme } from "../context/ThemeContext";

const ApiStatusIndicator = () => {
  const [isApiLive, setIsApiLive] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    // Initial check
    checkApiStatus().then((status) => {
      setIsApiLive(status);
      setIsChecking(false);
    });

    // Set up interval to check every 5 seconds
    const intervalId = setInterval(async () => {
      try {
        const status = await checkApiStatus();
        setIsApiLive(status);
      } catch (error) {
        console.log(error);
        setIsApiLive(false);
      }
    }, 2000); // Check every 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center">
      <div
        className={`flex items-center mr-2 px-2 py-1 rounded-full ${
          darkMode ? "bg-gray-700 bg-opacity-50" : "bg-white bg-opacity-20"
        }`}
      >
        <span
          className={`text-xs mr-1 font-medium ${
            darkMode ? "text-gray-300" : "text-black"
          }`}
        >
          API:
        </span>
        {isChecking ? (
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse mr-1"></div>
            <span
              className={`text-xs font-medium ${
                darkMode ? "text-yellow-300" : "text-yellow-200"
              }`}
            >
              Checking
            </span>
          </div>
        ) : isApiLive ? (
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-1"></div>
            <span
              className={`text-xs font-medium ${
                darkMode ? "text-green-300" : "text-green-600"
              }`}
            >
              Live
            </span>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
            <span
              className={`text-xs font-medium ${
                darkMode ? "text-red-300" : "text-red-200"
              }`}
            >
              Offline
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiStatusIndicator;

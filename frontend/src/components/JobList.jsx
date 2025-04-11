import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import JobCard from "./JobCard";
import JobTable from "./JobTable";
import { pageTransition } from "../utils/animations";
import { useTheme } from "../context/ThemeContext";
import { useKeyboardShortcuts } from "../context/KeyboardShortcutsContext";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("card"); // 'card' or 'table'
  const { darkMode } = useTheme();
  const { registerActions } = useKeyboardShortcuts();

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const filterRef = useRef(null);
  const gridRef = useRef(null);
  const emptyStateRef = useRef(null);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Use environment variable for API endpoint
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/jobs`
        );
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Reference for content container
  const contentRef = useRef(null);

  // Handle view mode toggle with animation
  const handleViewModeChange = useCallback(
    (mode) => {
      if (mode === viewMode) return; // Don't animate if mode hasn't changed

      // Check if content ref is available
      if (!contentRef.current) {
        // If not, just change the view mode without animation
        setViewMode(mode);
        return;
      }

      // Animate content out
      const tl = gsap.timeline();

      tl.to(contentRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          // Change view mode after fade out
          setViewMode(mode);

          // Check if content ref is still available
          if (contentRef.current) {
            // Then animate back in
            gsap.fromTo(
              contentRef.current,
              { opacity: 0, y: 10 },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out",
                delay: 0.1,
              }
            );
          }
        },
      });
    },
    [viewMode]
  );

  // Filter jobs based on status
  const filteredJobs =
    filter === "all"
      ? jobs
      : jobs.filter((job) => job.status.toLowerCase() === filter);

  // Register keyboard shortcuts for view mode toggle
  useEffect(() => {
    const setCardView = () => handleViewModeChange("card");
    const setTableView = () => handleViewModeChange("table");
    registerActions({
      setCardView,
      setTableView,
    });
  }, [handleViewModeChange, registerActions]);

  // Initialize animations
  useGSAP(() => {
    // Check if refs are available
    if (containerRef.current) {
      // Animate page elements on mount
      pageTransition(containerRef.current);
    }

    // Animate title with slight delay if ref is available
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: "power2.out" }
      );
    }

    // Animate filter with slight delay if ref is available
    if (filterRef.current) {
      gsap.fromTo(
        filterRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  // Handle filter change with animation
  const handleFilterChange = (e) => {
    const newFilter = e.target.value;

    // Don't animate if filter hasn't changed
    if (newFilter === filter) return;

    // If content ref is not available, just update the filter without animation
    if (!contentRef.current) {
      setFilter(newFilter);
      return;
    }

    // Animate content out
    const tl = gsap.timeline();

    tl.to(contentRef.current, {
      opacity: 0.5,
      y: 5,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        // Change filter after fade out
        setFilter(newFilter);

        // Check if content ref is still available
        if (contentRef.current) {
          // Then animate back in
          gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className={darkMode ? "text-white" : "text-gray-800"}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
        <h1
          ref={titleRef}
          className={`text-2xl font-bold pb-1 border-b-2 ${
            darkMode
              ? "text-blue-400 border-gray-700"
              : "text-blue-700 border-blue-200"
          }`}
        >
          Your Job Applications
        </h1>
        <div ref={filterRef} className="flex flex-wrap gap-3 items-center">
          {/* View Toggle */}
          <div
            className={`flex rounded-md p-1 mr-2 border shadow-sm mb-2 sm:mb-0 ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-blue-100 border-blue-200"
            }`}
          >
            <button
              onClick={() => handleViewModeChange("card")}
              className={`px-3 py-1 rounded-md text-sm transition-all duration-300 ${
                viewMode === "card"
                  ? darkMode
                    ? "bg-gray-800 text-blue-400 shadow-sm font-medium"
                    : "bg-white text-blue-600 shadow-sm font-medium"
                  : darkMode
                  ? "text-gray-300 hover:bg-gray-600"
                  : "text-blue-700 hover:bg-blue-200"
              }`}
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                Cards
              </span>
            </button>
            <button
              onClick={() => handleViewModeChange("table")}
              className={`px-3 py-1 rounded-md text-sm transition-all duration-300 ${
                viewMode === "table"
                  ? darkMode
                    ? "bg-gray-800 text-blue-400 shadow-sm font-medium"
                    : "bg-white text-blue-600 shadow-sm font-medium"
                  : darkMode
                  ? "text-gray-300 hover:bg-gray-600"
                  : "text-blue-700 hover:bg-blue-200"
              }`}
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                Table
              </span>
            </button>
          </div>

          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={handleFilterChange}
            className={`border rounded-md px-3 py-2 focus:ring-2 outline-none transition-all duration-300 shadow-sm w-full sm:w-auto ${
              darkMode
                ? "border-gray-600 bg-gray-700 text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                : "border-blue-300 bg-white text-blue-700 focus:ring-blue-300 focus:border-blue-500"
            }`}
          >
            <option value="all">All Status</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div ref={contentRef} className="w-full overflow-x-auto">
        {loading ? (
          <div className="text-center py-8">
            <div
              className={`inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 mb-2 ${
                darkMode ? "border-blue-400" : "border-blue-600"
              }`}
            ></div>
            <p>Loading...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div ref={emptyStateRef} className="text-center py-8 animate-fadeIn">
            <p className="mb-4">No job applications found.</p>
            <Link
              to="/add"
              className={`px-4 py-2 rounded-md transition-colors duration-300 inline-block ${
                darkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Add Your First Job
            </Link>
          </div>
        ) : viewMode === "card" ? (
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-1"
          >
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} setJobs={setJobs} />
            ))}
          </div>
        ) : (
          <div ref={gridRef} className="overflow-x-auto">
            <JobTable jobs={filteredJobs} setJobs={setJobs} />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;

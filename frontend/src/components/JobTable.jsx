import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useTheme } from "../context/ThemeContext";

const JobTable = ({ jobs, setJobs }) => {
  const tableRef = useRef(null);
  const { darkMode } = useTheme();

  // State for sorting
  const [sortConfig, setSortConfig] = useState({
    key: "dateApplied",
    direction: "descending",
  });

  // Sort jobs based on current sort configuration
  const sortedJobs = [...jobs].sort((a, b) => {
    if (!a[sortConfig.key] || !b[sortConfig.key]) return 0;

    let comparison = 0;
    const keyA =
      sortConfig.key === "dateApplied"
        ? new Date(a[sortConfig.key]).getTime()
        : a[sortConfig.key].toLowerCase();
    const keyB =
      sortConfig.key === "dateApplied"
        ? new Date(b[sortConfig.key]).getTime()
        : b[sortConfig.key].toLowerCase();

    if (keyA > keyB) {
      comparison = 1;
    } else if (keyA < keyB) {
      comparison = -1;
    }

    return sortConfig.direction === "ascending" ? comparison : -comparison;
  });

  // Handle column header click for sorting
  const handleSort = (key) => {
    let direction = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    // Update the sort configuration immediately if no rows to animate
    const tableRows = document.querySelectorAll(".table-row");
    if (tableRows.length === 0) {
      setSortConfig({ key, direction });
      return;
    }

    // Create a timeline for more complex animation
    const tl = gsap.timeline();

    // First slightly fade out the rows
    tl.to(".table-row", {
      opacity: 0.5,
      y: 5,
      duration: 0.2,
      ease: "power1.out",
      stagger: 0.01,
    });

    // Then update the sort configuration
    tl.add(() => {
      setSortConfig({ key, direction });
    });

    // Finally fade the rows back in with a stagger effect
    tl.to(".table-row", {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
      stagger: 0.03,
    });

    // Animate the clicked header if it exists
    const headerElement = document.querySelector(`th[data-sort="${key}"]`);
    if (headerElement) {
      gsap.to(headerElement, {
        backgroundColor: darkMode
          ? "rgba(59, 130, 246, 0.3)"
          : "rgba(191, 219, 254, 0.6)", // blue background based on theme
        duration: 0.3,
        ease: "power1.out",
        yoyo: true,
        repeat: 1,
      });
    }
  };

  // Get sort direction indicator
  const getSortDirectionIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? (
        <span
          className={`ml-1 font-bold ${
            darkMode ? "text-blue-400" : "text-blue-800"
          }`}
        >
          ↑
        </span>
      ) : (
        <span
          className={`ml-1 font-bold ${
            darkMode ? "text-blue-400" : "text-blue-800"
          }`}
        >
          ↓
        </span>
      );
    }
    return (
      <span
        className={`ml-1 opacity-0 group-hover:opacity-100 ${
          darkMode ? "text-blue-500" : "text-blue-300"
        }`}
      >
        ↕
      </span>
    );
  };

  // Initialize animations
  useGSAP(() => {
    // Check if there are table rows to animate
    const tableRows = document.querySelectorAll(".table-row");
    if (tableRows.length > 0) {
      // Animate table rows on mount with staggered effect
      gsap.fromTo(
        ".table-row",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: "power1.out",
        }
      );
    }
  }, [jobs.length]);

  const handleDelete = async (jobId) => {
    if (
      window.confirm("Are you sure you want to delete this job application?")
    ) {
      try {
        // Find the row element to animate
        const rowElement = document.getElementById(`job-row-${jobId}`);

        // Check if row element exists
        if (rowElement) {
          // Animate the row before deletion
          await gsap.to(rowElement, {
            opacity: 0,
            height: 0,
            padding: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: async () => {
              // Use environment variable for API endpoint
              await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/jobs/${jobId}`,
                {
                  method: "DELETE",
                }
              );

              // Update the jobs state by filtering out the deleted job
              setJobs((prevJobs) => prevJobs.filter((j) => j._id !== jobId));
            },
          });
        } else {
          // If row element doesn't exist, just delete without animation
          await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/${jobId}`, {
            method: "DELETE",
          });

          // Update the jobs state by filtering out the deleted job
          setJobs((prevJobs) => prevJobs.filter((j) => j._id !== jobId));
        }
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  // Function to get status badge color
  const getStatusColor = (status) => {
    const statusColors = {
      applied: "bg-yellow-100 text-yellow-800 border-yellow-200",
      interview: "bg-blue-100 text-blue-800 border-blue-200",
      offer: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      statusColors[status.toLowerCase()] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div>
      <div
        className={`mb-2 text-xs sm:text-sm italic flex items-center ${
          darkMode ? "text-blue-400" : "text-blue-500"
        }`}
      >
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
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Click on column headers to sort</span>
      </div>
      <div className="overflow-x-auto w-full">
        <table
          ref={tableRef}
          className={`w-full divide-y rounded-lg overflow-hidden shadow-md border ${
            darkMode
              ? "divide-gray-700 bg-gray-800 border-gray-700"
              : "divide-blue-200 bg-white border-blue-200"
          }`}
          style={{ minWidth: "900px" }}
        >
          <thead className={darkMode ? "bg-gray-700" : "bg-blue-50"}>
            <tr>
              <th
                scope="col"
                data-sort="company"
                className={`px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors duration-200 group ${
                  darkMode
                    ? "text-blue-300 hover:bg-gray-600"
                    : "text-blue-600 hover:bg-blue-100"
                }`}
                style={{ width: "15%" }}
                onClick={() => handleSort("company")}
              >
                <div className="flex items-center">
                  Company {getSortDirectionIndicator("company")}
                </div>
              </th>
              <th
                scope="col"
                data-sort="role"
                className={`px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors duration-200 group ${
                  darkMode
                    ? "text-blue-300 hover:bg-gray-600"
                    : "text-blue-600 hover:bg-blue-100"
                }`}
                style={{ width: "20%" }}
                onClick={() => handleSort("role")}
              >
                <div className="flex items-center">
                  Role {getSortDirectionIndicator("role")}
                </div>
              </th>
              <th
                scope="col"
                data-sort="status"
                className={`px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors duration-200 group ${
                  darkMode
                    ? "text-blue-300 hover:bg-gray-600"
                    : "text-blue-600 hover:bg-blue-100"
                }`}
                style={{ width: "15%" }}
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center">
                  Status {getSortDirectionIndicator("status")}
                </div>
              </th>
              <th
                scope="col"
                data-sort="dateApplied"
                className={`px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors duration-200 group ${
                  darkMode
                    ? "text-blue-300 hover:bg-gray-600"
                    : "text-blue-600 hover:bg-blue-100"
                }`}
                style={{ width: "15%" }}
                onClick={() => handleSort("dateApplied")}
              >
                <div className="flex items-center">
                  Date Applied {getSortDirectionIndicator("dateApplied")}
                </div>
              </th>
              <th
                scope="col"
                className={`px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? "text-blue-300" : "text-blue-600"
                }`}
                style={{ width: "15%" }}
              >
                Job Link
              </th>
              <th
                scope="col"
                className={`px-4 sm:px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${
                  darkMode ? "text-blue-300" : "text-blue-600"
                }`}
                style={{ width: "20%" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              darkMode
                ? "bg-gray-800 divide-gray-700"
                : "bg-white divide-gray-200"
            }`}
          >
            {sortedJobs.map((job) => (
              <tr
                key={job._id}
                id={`job-row-${job._id}`}
                className={`table-row transition-colors duration-150 ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                }`}
              >
                <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                  <div
                    className={`text-sm font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {job.company}
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                  <div
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-900"
                    }`}
                  >
                    {job.role}
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      job.status
                    )}`}
                  >
                    {job.status}
                  </span>
                </td>
                <td
                  className={`px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {formatDate(job.dateApplied)}
                </td>
                <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">
                  {job.link ? (
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`hover:underline ${
                        darkMode
                          ? "text-blue-400 hover:text-blue-300"
                          : "text-blue-600 hover:text-blue-900"
                      }`}
                    >
                      View
                    </a>
                  ) : (
                    <span
                      className={darkMode ? "text-gray-500" : "text-gray-400"}
                    >
                      N/A
                    </span>
                  )}
                </td>
                <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`/edit/${job._id}`}
                      className={`relative px-2 py-1 rounded transition-colors duration-150 group overflow-hidden ${
                        darkMode
                          ? "text-indigo-400 hover:text-indigo-300"
                          : "text-indigo-600 hover:text-indigo-900"
                      }`}
                    >
                      <span className="relative z-10">Edit</span>
                      <span
                        className={`absolute inset-0 border border-transparent rounded opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-105 group-hover:scale-100 ${
                          darkMode
                            ? "group-hover:border-indigo-500"
                            : "group-hover:border-indigo-300"
                        }`}
                      ></span>
                    </Link>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className={`relative px-2 py-1 rounded transition-colors duration-150 group overflow-hidden ${
                        darkMode
                          ? "text-red-400 hover:text-red-300"
                          : "text-red-600 hover:text-red-900"
                      }`}
                    >
                      <span className="relative z-10">Delete</span>
                      <span
                        className={`absolute inset-0 border border-transparent rounded opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-105 group-hover:scale-100 ${
                          darkMode
                            ? "group-hover:border-red-500"
                            : "group-hover:border-red-300"
                        }`}
                      ></span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobTable;

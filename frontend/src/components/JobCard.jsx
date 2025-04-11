import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  statusBadgePulse,
  deleteAnimation,
  buttonHover,
} from "../utils/animations";
import { useTheme } from "../context/ThemeContext";

const JobCard = ({ job, setJobs }) => {
  const cardRef = useRef(null);
  const statusRef = useRef(null);
  const editButtonRef = useRef(null);
  const deleteButtonRef = useRef(null);
  const [editButtonTimeline, setEditButtonTimeline] = useState(null);
  const [deleteButtonTimeline, setDeleteButtonTimeline] = useState(null);
  const { darkMode } = useTheme();

  const statusColors = {
    applied: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    interview: "bg-blue-100 text-blue-800 border border-blue-300",
    offer: "bg-green-100 text-green-800 border border-green-300",
    rejected: "bg-red-100 text-red-800 border border-red-300",
  };

  // Initialize animations
  useGSAP(() => {
    // Create button hover animations if refs are available
    if (editButtonRef.current && deleteButtonRef.current) {
      const editTimeline = buttonHover(editButtonRef.current, 1.03);
      const deleteTimeline = buttonHover(deleteButtonRef.current, 1.03);

      setEditButtonTimeline(editTimeline);
      setDeleteButtonTimeline(deleteTimeline);
    }

    // Add entrance animation if card ref is available
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, []);

  // Handle status badge click for pulse animation
  const handleStatusClick = () => {
    if (statusRef.current) {
      statusBadgePulse(statusRef.current);
    }
  };

  // Handle button hover
  const handleEditMouseEnter = () => editButtonTimeline?.play();
  const handleEditMouseLeave = () => editButtonTimeline?.reverse();
  const handleDeleteMouseEnter = () => deleteButtonTimeline?.play();
  const handleDeleteMouseLeave = () => deleteButtonTimeline?.reverse();

  const handleDelete = async () => {
    if (
      window.confirm("Are you sure you want to delete this job application?")
    ) {
      try {
        // Check if card ref is available
        if (cardRef.current) {
          // Animate before deletion
          await deleteAnimation(cardRef.current).then(async () => {
            // Use environment variable for API endpoint
            await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/api/jobs/${job._id}`,
              {
                method: "DELETE",
              }
            );

            // Update the jobs state by filtering out the deleted job
            setJobs((prevJobs) => prevJobs.filter((j) => j._id !== job._id));
          });
        } else {
          // If card ref is not available, just delete without animation
          await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/jobs/${job._id}`,
            {
              method: "DELETE",
            }
          );

          // Update the jobs state by filtering out the deleted job
          setJobs((prevJobs) => prevJobs.filter((j) => j._id !== job._id));
        }
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  return (
    <div
      ref={cardRef}
      className={`border rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 ${
        darkMode
          ? "border-gray-700 bg-gray-800 hover:border-gray-500 hover:bg-gray-700"
          : "border-blue-200 bg-white hover:border-blue-300 hover:bg-blue-50"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h2
          className={`text-lg font-semibold ${
            darkMode ? "text-blue-400" : "text-blue-700"
          }`}
        >
          {job.company}
        </h2>
        <span
          ref={statusRef}
          onClick={handleStatusClick}
          className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer shadow-sm hover:shadow transition-shadow duration-200 ${
            statusColors[job.status.toLowerCase()]
          }`}
        >
          {job.status}
        </span>
      </div>
      <p
        className={`mb-2 font-medium ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {job.role}
      </p>
      <p
        className={`text-sm mb-3 ${
          darkMode ? "text-blue-400" : "text-blue-500"
        }`}
      >
        Applied: {new Date(job.dateApplied).toLocaleDateString()}
      </p>

      {job.link && (
        <a
          href={job.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-sm hover:underline block mb-4 transition-colors duration-300 font-medium ${
            darkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          View Job Posting
        </a>
      )}

      <div
        className={`flex justify-end gap-2 mt-3 pt-2 border-t-2 ${
          darkMode ? "border-gray-600" : "border-blue-100"
        }`}
      >
        <Link
          to={`/edit/${job._id}`}
          ref={editButtonRef}
          onMouseEnter={handleEditMouseEnter}
          onMouseLeave={handleEditMouseLeave}
          className={`relative px-3 py-1 rounded text-sm transition-colors duration-300 group overflow-hidden ${
            darkMode
              ? "bg-gray-700 text-blue-300 hover:bg-gray-600"
              : "bg-blue-50 text-blue-700 hover:bg-blue-100"
          }`}
        >
          <span className="relative z-10">Edit</span>
          <span
            className={`absolute inset-0 border-2 border-transparent rounded opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-105 group-hover:scale-100 ${
              darkMode
                ? "group-hover:border-blue-400"
                : "group-hover:border-blue-500"
            }`}
          ></span>
        </Link>
        <button
          onClick={handleDelete}
          ref={deleteButtonRef}
          onMouseEnter={handleDeleteMouseEnter}
          onMouseLeave={handleDeleteMouseLeave}
          className={`relative px-3 py-1 rounded text-sm transition-colors duration-300 group overflow-hidden ${
            darkMode
              ? "bg-gray-700 text-red-300 hover:bg-gray-600"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
        >
          <span className="relative z-10">Delete</span>
          <span
            className={`absolute inset-0 border-2 border-transparent rounded opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-105 group-hover:scale-100 ${
              darkMode
                ? "group-hover:border-red-400"
                : "group-hover:border-red-500"
            }`}
          ></span>
        </button>
      </div>
    </div>
  );
};

export default JobCard;

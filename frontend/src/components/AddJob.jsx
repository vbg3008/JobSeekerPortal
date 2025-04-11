import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { gsap } from "gsap";

const AddJob = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    dateApplied: new Date().toISOString().split("T")[0],
    link: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use environment variable for API endpoint
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/jobs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        navigate("/");
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "Failed to add job"}`);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Failed to add job. Please try again.");
      setLoading(false);
    }
  };

  // Form animation ref
  const formRef = useRef(null);

  // Animate form on mount
  useEffect(() => {
    if (formRef.current) {
      // Initial state
      gsap.set(formRef.current, { opacity: 0, y: 20 });

      // Animate in
      gsap.to(formRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.1,
      });
    }

    // Cleanup function
    return () => {
      if (formRef.current) {
        gsap.killTweensOf(formRef.current);
      }
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6">
      <h1 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : ""}`}>
        Add New Job Application
      </h1>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`p-4 sm:p-6 rounded-lg shadow-md min-h-[500px] ${
          darkMode ? "bg-gray-800 text-gray-200" : "bg-white"
        }`}
      >
        <div className="mb-4 w-full">
          <label
            className={`block mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
            htmlFor="company"
          >
            Company Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className={`w-full rounded-md px-3 py-2 border h-10 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            }`}
          />
        </div>

        <div className="mb-4">
          <label
            className={`block mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
            htmlFor="role"
          >
            Role/Position<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className={`w-full rounded-md px-3 py-2 border h-10 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            }`}
          />
        </div>

        <div className="mb-4">
          <label
            className={`block mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
            htmlFor="status"
          >
            Status<span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className={`w-full rounded-md px-3 py-2 border h-10 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            }`}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className={`block mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
            htmlFor="dateApplied"
          >
            Date Applied<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="dateApplied"
            name="dateApplied"
            value={formData.dateApplied}
            onChange={handleChange}
            required
            className={`w-full rounded-md px-3 py-2 border h-10 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            }`}
          />
        </div>

        <div className="mb-6">
          <label
            className={`block mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
            htmlFor="link"
          >
            Job Link (Optional)
          </label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className={`w-full rounded-md px-3 py-2 border h-10 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300"
            }`}
            placeholder="https://example.com/job-posting"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className={`px-4 py-2 rounded-md border h-10 hidden sm:block ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                : "bg-white border-gray-300 hover:bg-gray-100"
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`text-white px-4 py-2 rounded-md h-10 ${
              darkMode
                ? "bg-blue-500 hover:bg-blue-600 disabled:bg-blue-800 disabled:text-blue-100"
                : "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
            }`}
          >
            {loading ? "Saving..." : "Save Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;

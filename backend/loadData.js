import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Job from "./models/jobModel.js";

dotenv.config();

// Connect to database
connectDB();

// Sample job data
const jobData = [
  {
    company: "Google",
    role: "Frontend Developer",
    status: "Applied",
    dateApplied: new Date("2025-03-15"),
    link: "https://careers.google.com/jobs/results/",
  },
  {
    company: "Microsoft",
    role: "Software Engineer",
    status: "Interview",
    dateApplied: new Date("2025-03-10"),
    link: "https://careers.microsoft.com/us/en",
  },
  {
    company: "Amazon",
    role: "Full Stack Developer",
    status: "Rejected",
    dateApplied: new Date("2025-02-28"),
    link: "https://www.amazon.jobs/",
  },
  {
    company: "Netflix",
    role: "UI/UX Designer",
    status: "Offer",
    dateApplied: new Date("2025-03-05"),
    link: "https://jobs.netflix.com/",
  },
  {
    company: "Meta",
    role: "React Developer",
    status: "Applied",
    dateApplied: new Date("2025-03-20"),
    link: "https://www.metacareers.com/",
  },
  {
    company: "Apple",
    role: "iOS Developer",
    status: "Interview",
    dateApplied: new Date("2025-03-12"),
    link: "https://www.apple.com/careers/us/",
  },
  {
    company: "IBM",
    role: "Backend Developer",
    status: "Applied",
    dateApplied: new Date("2025-03-18"),
    link: "https://www.ibm.com/careers",
  },
  {
    company: "Adobe",
    role: "Product Designer",
    status: "Rejected",
    dateApplied: new Date("2025-02-25"),
    link: "https://www.adobe.com/careers.html",
  },
];

// Function to import data
const importData = async () => {
  try {
    // Clear existing data
    await Job.deleteMany();

    // Insert new data
    await Job.insertMany(jobData);

    console.log("Data imported successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Function to destroy data
const destroyData = async () => {
  try {
    // Clear all data
    await Job.deleteMany();

    console.log("Data destroyed successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Determine which function to run based on command line argument
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

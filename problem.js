const jobApplications = [
  {
    company: "Google",
    role: "SDE Intern",
    appliedDate: "2025-04-01",
  },
  {
    company: "Amazon",
    role: "Backend Intern",
    appliedDate: "2025-03-15",
  },
  {
    company: "Meta",
    role: "Frontend Intern",
    appliedDate: "2025-04-05",
  },
];

function sortApplicationsByDate(applications) {
  return applications.sort(
    (a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)
  );
}

const sortedApplications = sortApplicationsByDate(jobApplications);
console.log("Sorted Job Applications by Date:");
console.log(sortedApplications);

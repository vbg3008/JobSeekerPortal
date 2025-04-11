import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please add a company name"],
    },
    role: {
      type: String,
      required: [true, "Please add a role/position"],
    },
    status: {
      type: String,
      required: [true, "Please add a status"],
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },
    dateApplied: {
      type: Date,
      required: [true, "Please add an application date"],
      default: Date.now,
    },
    link: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;

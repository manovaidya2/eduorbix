import mongoose from "mongoose";

const studyAbroadSchema = new mongoose.Schema(
  {
    country: { type: String, required: true },
    flag: String,

    desc: String,
    whyStudy: String,
    cost: String,
    intakes: String,
    visa: String,
    scholarships: String,

    features: [String],
    universities: [String]
  },
  { timestamps: true }
);

export default mongoose.model("StudyAbroad", studyAbroadSchema);
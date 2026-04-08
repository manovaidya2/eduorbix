import mongoose from "mongoose";

const caseStudySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    shortDescription: {
      type: String,
    },

    image: {
      type: String, // base64 OR image URL
    },

    content: {
      type: String, // HTML from editor
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CaseStudy", caseStudySchema);

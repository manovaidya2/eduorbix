import CaseStudy from "../models/CaseStudy.js";

/* ✅ CREATE CASE STUDY */
export const createCaseStudy = async (req, res) => {
  try {
    const { title, slug, shortDescription, image, content } = req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const exists = await CaseStudy.findOne({ slug });
    if (exists) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    const caseStudy = await CaseStudy.create({
      title,
      slug,
      shortDescription,
      image,
      content,
    });

    res.status(201).json({
      success: true,
      message: "Case Study created successfully",
      data: caseStudy,
    });
  } catch (error) {
    console.error("Create CaseStudy Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ✅ GET ALL CASE STUDIES */
export const getAllCaseStudies = async (req, res) => {
  try {
    const data = await CaseStudy.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ✅ GET SINGLE CASE STUDY BY SLUG */
export const getCaseStudyBySlug = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findOne({ slug: req.params.slug });
    if (!caseStudy) {
      return res.status(404).json({ message: "Case Study not found" });
    }
    res.json(caseStudy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ✅ DELETE CASE STUDY */
export const deleteCaseStudy = async (req, res) => {
  try {
    await CaseStudy.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Case Study deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ✅ UPDATE CASE STUDY */
export const updateCaseStudy = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, shortDescription, image, content } = req.body;

    // Check if case study exists
    const caseStudy = await CaseStudy.findById(id);
    if (!caseStudy) {
      return res.status(404).json({ message: "Case Study not found" });
    }

    // Check if slug is being changed and if it already exists
    if (slug && slug !== caseStudy.slug) {
      const exists = await CaseStudy.findOne({ slug, _id: { $ne: id } });
      if (exists) {
        return res.status(400).json({ message: "Slug already exists" });
      }
    }

    // Update case study
    const updatedCaseStudy = await CaseStudy.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        shortDescription,
        image,
        content,
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Case Study updated successfully",
      data: updatedCaseStudy,
    });
  } catch (error) {
    console.error("Update CaseStudy Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
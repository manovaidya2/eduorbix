import StudyAbroad from "../models/studyAbroadModel.js";

// CREATE
export const createStudyAbroad = async (req, res) => {
  try {
    const data = await StudyAbroad.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
export const getStudyAbroad = async (req, res) => {
  try {
    const data = await StudyAbroad.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteStudyAbroad = async (req, res) => {
  try {
    await StudyAbroad.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// UPDATE
export const updateStudyAbroad = async (req, res) => {
  try {
    const data = await StudyAbroad.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!data) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
export const getStudyAbroadById = async (req, res) => {
  try {
    const data = await StudyAbroad.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
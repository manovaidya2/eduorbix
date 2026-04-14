import Associates from "../models/associates.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create - Existing code
export const createAssociates = async (req, res) => {
  try {
    const { name, location, type, website } = req.body;

    let logo = "";
    if (req.files?.logo) {
      logo = req.files.logo[0].filename;
    }

    let documents = [];
    if (req.files?.documents) {
      documents = req.files.documents.map((file) => file.filename);
    }

    const newAssociates = new Associates({
      name,
      location,
      type,
      website,
      logo,
      documents,
    });

    await newAssociates.save();

    res.status(201).json({
      message: "Associates created successfully",
      data: newAssociates,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all associates
export const getAllAssociates = async (req, res) => {
  try {
    const associates = await Associates.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: associates,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get single associate by ID
export const getAssociateById = async (req, res) => {
  try {
    const { id } = req.params;
    const associate = await Associates.findById(id);

    if (!associate) {
      return res.status(404).json({ message: "Associate not found" });
    }

    res.status(200).json({
      success: true,
      data: associate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update associate
export const updateAssociate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, type, website } = req.body;

    const existingAssociate = await Associates.findById(id);
    if (!existingAssociate) {
      return res.status(404).json({ message: "Associate not found" });
    }

    // Handle logo update
    let logo = existingAssociate.logo;
    if (req.files?.logo) {
      // Delete old logo if exists
      if (existingAssociate.logo) {
        const oldLogoPath = path.join(__dirname, "../uploads", existingAssociate.logo);
        if (fs.existsSync(oldLogoPath)) {
          fs.unlinkSync(oldLogoPath);
        }
      }
      logo = req.files.logo[0].filename;
    }

    // Handle documents update
    let documents = existingAssociate.documents;
    if (req.files?.documents && req.files.documents.length > 0) {
      const newDocuments = req.files.documents.map((file) => file.filename);
      documents = [...documents, ...newDocuments];
    }

    const updatedAssociate = await Associates.findByIdAndUpdate(
      id,
      {
        name,
        location,
        type,
        website,
        logo,
        documents,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Associate updated successfully",
      data: updatedAssociate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete single document from associate
export const deleteDocument = async (req, res) => {
  try {
    const { id, docIndex } = req.params;
    const associate = await Associates.findById(id);

    if (!associate) {
      return res.status(404).json({ message: "Associate not found" });
    }

    // Get the document filename
    const docToDelete = associate.documents[docIndex];
    if (docToDelete) {
      // Delete file from uploads folder
      const docPath = path.join(__dirname, "../uploads", docToDelete);
      if (fs.existsSync(docPath)) {
        fs.unlinkSync(docPath);
      }
    }

    // Remove document from array
    associate.documents.splice(docIndex, 1);
    await associate.save();

    res.status(200).json({
      message: "Document deleted successfully",
      data: associate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete associate completely
export const deleteAssociate = async (req, res) => {
  try {
    const { id } = req.params;
    const associate = await Associates.findById(id);

    if (!associate) {
      return res.status(404).json({ message: "Associate not found" });
    }

    // Delete logo file
    if (associate.logo) {
      const logoPath = path.join(__dirname, "../uploads", associate.logo);
      if (fs.existsSync(logoPath)) {
        fs.unlinkSync(logoPath);
      }
    }

    // Delete all document files
    associate.documents.forEach((doc) => {
      const docPath = path.join(__dirname, "../uploads", doc);
      if (fs.existsSync(docPath)) {
        fs.unlinkSync(docPath);
      }
    });

    // Delete from database
    await Associates.findByIdAndDelete(id);

    res.status(200).json({
      message: "Associate deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const Batch = require("../model/batch.model");

// Create a new batch
const createBatch = async (req, res) => {
  try {
    const { batchName } = req.body;
    const newBatch = new Batch({ batchName });
    await newBatch.save();
    res.status(201).json({ message: "Batch created successfully", data: newBatch });
  } catch (error) {
    res.status(500).json({ message: "Error creating batch", error: error.message });
  }
};

// Get all batches
const getAllBatches = async (req, res) => {
  try {
    const batches = await Batch.find();
    res.status(200).json( batches );
  } catch (error) {
    res.status(500).json({ message: "Error fetching batches", error: error.message });
  }
};

// Get batch by ID
const getBatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const batch = await Batch.findById(id).populate("courses");
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }
    res.status(200).json({ data: batch });
  } catch (error) {
    res.status(500).json({ message: "Error fetching batch", error: error.message });
  }
};

// Update batch by ID
const updateBatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const { batchName } = req.body;
    const updatedBatch = await Batch.findByIdAndUpdate(id, { batchName }, { new: true });
    if (!updatedBatch) {
      return res.status(404).json({ message: "Batch not found" });
    }
    res.status(200).json({ message: "Batch updated successfully", data: updatedBatch });
  } catch (error) {
    res.status(500).json({ message: "Error updating batch", error: error.message });
  }
};

// Delete batch by ID
const deleteBatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBatch = await Batch.findByIdAndDelete(id);
    if (!deletedBatch) {
      return res.status(404).json({ message: "Batch not found" });
    }
    res.status(200).json({ message: "Batch deleted successfully", data: deletedBatch });
  } catch (error) {
    res.status(500).json({ message: "Error deleting batch", error: error.message });
  }
};

module.exports = {
  createBatch,
  getAllBatches,
  getBatchById,
  updateBatchById,
  deleteBatchById,
};

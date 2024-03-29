const express = require("express");
const router = express.Router();
const batchController = require("../controllers/batch.controller");

// POST /api/batches - Create a new batch
router.post("/", batchController.createBatch);

// GET /api/batches - Get all batches
router.get("/", batchController.getAllBatches);

// GET /api/batches/:id - Get batch by ID
router.get("/:id", batchController.getBatchById);

// PUT /api/batches/:id - Update batch by ID
router.put("/:id", batchController.updateBatchById);

// DELETE /api/batches/:id - Delete batch by ID
router.delete("/:id", batchController.deleteBatchById);

module.exports = router;

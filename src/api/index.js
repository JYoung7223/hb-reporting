const express = require("express");

const router = express.Router();
const budgetRoutes = require("./budgetRoutes");
const statRoutes = require("./statRoutes");

router.use("/budget", budgetRoutes);
router.use("/stat", statRoutes);

module.exports = router;
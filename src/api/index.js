const express = require("express");

const router = express.Router();
const budgetRoutes = require("./budgetRoutes");

router.use("/budget", budgetRoutes);
// router.use("/setting", settingRoutes);

module.exports = router;
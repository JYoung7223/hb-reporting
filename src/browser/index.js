const Router = require("express").Router();
const Path = require("path");

Router.use("/budget", (req,res)=>{
    res.sendFile(Path.join(__dirname, "../client/build/budgets.html"));
});
Router.use("/stat", (req,res)=>{
    res.sendFile(Path.join(__dirname, "../client/build/stats.html"));
});
Router.use("/", (req,res)=>{
    res.sendFile(Path.join(__dirname, "../client/build/index.html"));
});

module.exports = Router;
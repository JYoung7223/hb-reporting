const express = require("express");
const path = require("path");
const middlewares = require ("./middlewares"); // Setup Express Server middleware
const api = require("./api"); // Setup API Routes

const app = express();

app.use([
    express.urlencoded({extended: true}),
    express.json()
]);

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
}


app.use("/api", api); // Links API Routes here


app.use(function(req,res){
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app; // Gives access to this Express server's settings object.
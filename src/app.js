const express = require("express");
const middlewares = require ("./middlewares"); // Setup Express Server middleware
const api = require("./api"); // Setup API Routes
const browser = require("./browser"); // Setup Browser Routes
const Mongoose = require("mongoose");

const app = express();

app.use([
    express.urlencoded({extended: true}),
    express.json()
]);

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
}

app.use("/api", api); // Links API Routes here

Mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/hb-reporting",
    {
        dbName: "hb-reporting",
        useNewURLParser: true,
        useUnifiedTopology: true
    }
);

app.use("/", browser); // Links Browser Routes here


app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app; // Gives access to this Express server's settings object.
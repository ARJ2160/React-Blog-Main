//jshint esversion:6
//DEFINE BOILERPLATE
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require("./routes/routes")
const app = express();
require('dotenv').config()
const path = require("path")
let port = process.env.PORT || 5000;
__dirname = path.resolve()

//CONNECTING TO DATABASE
mongoose.connect(process.env.MONGODB_URI == "" ? process.env.MONGODB_URI : "mongodb+srv://admin:admin@blog-cluster.jgv4u.mongodb.net/blog-cluster?retryWrites=true&w=majority&ssl=true",
    { useNewUrlParser: true, useUnifiedTopology : true })
        .then(() => {
            console.log("Successfully Connected to Database");
        })
        .catch(err => {
            console.log(err);
        });

//APP CONFIG
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use("/", router);

if (process.env.NODE_ENV == "production") {
    
    app.use(express.static(path.join(__dirname, "client/build")))
    
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client","build", "index.html"))
    })
} else {
    app.get("/", (req, res) => { 
        res.send("Server not running on static")
    })
}

//APP LISTENS TO PORT
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
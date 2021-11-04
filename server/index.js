
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;


//Request coming onto homepage
app.get("/", (req, res) => {
    res.send("Quicknotes API!");
})
app.listen(PORT, () => {
    console.log("Express is app is running on port" + PORT)
})
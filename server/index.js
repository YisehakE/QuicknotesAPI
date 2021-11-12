const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;
const db = require("../data/db")

const notes = require("../routes/notes.js");
const users = require("../routes/users.js");
const auth = require("../routes/auth.js");

db.connect();
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Quicknote API!")
})

app.use(notes);
app.use(users);
app.use(auth);


app.listen(PORT, () => {
    console.log("Express is app is running on port" + PORT)
})
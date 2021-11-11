const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const db = require("../data/db")
const NoteDao = require("../data/NoteDao");

const notes = new NoteDao();

db.connect();
app.use(express.json());

//Request coming onto homepage
app.get("/api/notes", async (req, res) => {
    const { query } = req.query;
    const data = await notes.readAll(query);
    res.json({data});
})

app.get("/api/notes/:id", async (req, res) => {
    const { id } = req.params;
    const data = await notes.read(id);
    res.json({ data });
})

app.post("/api/notes", async (req, res) => {

    try {
        const { title, text } = req.body;
        const data = await notes.create( { title, text } );
        res.status(201).json( { data })
        res.json({ data });
    } catch (err) {
        res.json( { message: err.message} )
    }
})

app.delete("/api/notes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = await notes.delete(id);
      res.json({ data });
    } catch (err) {
      res.status(err.status).json({ message: err.message });
    }
  });

app.put("/api/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, text } = req.body;
        const data = await notes.update(id, { title, text });
        res.json({ data });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log("Express is app is running on port" + PORT)
})
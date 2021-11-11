
// const { v4: uuid4 } = require("uuid");


// class Note {
//     constructor(title, text) {
//         this._id = uuid4();
//         this.title = title;
//         this.text = text;
//     }
// }

const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;

// module.exports = Note;
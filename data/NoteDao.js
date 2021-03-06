const ApiError = require("../model/ApiError");
const Note = require("../model/Note");
const mongoose = require("mongoose");

 /*
    TIP(s):
        - Most APIs follow this standard of 
          returning whatever the API does back to user
        - This class of D.A.O follows the MVC pattern
 */

class NoteDao {

    // Pre: title must not be empty
    async create({ title, text, author }) {

        if (title === undefined || title === undefined) {
            throw new ApiError(400, "Every note must have a none-empty title!");
        }
        
        if (text === undefined) {
            throw new ApiError(400, "Every note must have a text attribute!");
          }
        
        if (!author || !mongoose.isValidObjectId(author)) { 
            throw new ApiError(400, "Every note must have an author!");
        }

        const note = await Note.create({ title, text, author });

        return note;
    }

    async read(author, id) {
        const note = await Note.findById(id);
      
        if (!author || !mongoose.isValidObjectId(author)) {
          throw new ApiError(500, "Author attribute was is invalid or missing!");
        }
      
        if (note === null) {
          throw new ApiError(404, "There is no note with the given ID!");
        }
      
        if (note.author.toString() !== author) {
          throw new ApiError(
            403,
            "You are not authorized to access this resource!"
          );
        }
      
        return note;
    }

    // returns an empty array if there is no note in the database
    //  for the given author or no note matches the search query
    async readAll(author, query = "") {
        if (!author || !mongoose.isValidObjectId(author)) {
        throw new ApiError(500, "Author attribute was is invalid or missing!");
        }
    
        const notes = await Note.find({ author });
    
        if (query !== "") {
        return notes.filter(
            (note) => note.title.includes(query) || note.text.includes(query)
        );
        }
    
        return notes;
    }

    async update(author, id, { title, text }) {
        await this.read(author, id);
        return Note.findByIdAndUpdate(
          id,
          { title, text },
          { new: true, runValidators: true }
        );
    }

    async delete(author, id) {
        await this.read(author, id);
        return Note.findByIdAndDelete(id);
    }

}

module.exports = NoteDao; 
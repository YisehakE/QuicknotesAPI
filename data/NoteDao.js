const ApiError = require("../model/ApiError");
const Note = require("../model/Note");


 /*
    TIP(s):
        - Most APIs follow this standard of 
          returning whatever the API does back to user
        - This class of D.A.O follows the MVC pattern
 */

class NoteDao {

    constructor() {
        this.notes = [];
    }


    // Pre: title must not be empty
    async create( { title, text } ) {

        if (title === undefined || title === undefined) {
            throw new ApiError(400, "Every note must have a none-empty title!");
        }

        // const note = new Note(title, text);
        // this.notes.push(note);

        const note = await Note.create({ title, text })
        return note;
    }

    // Pre: id is valid
    async read(id) {
        const note = await Note.findById(id);
        // return this.notes.find((note) => note._id === id);
        return note ? note : [];
    }

    async readAll(query = "") {

        if (!query) {
            const notes = await Note.find({});
            // return this.notes
            return notes;
        } 

        const notes = await Note.find().or([ { title: query }, { text: query } ])
        return notes;
        // return this.notes.filter((note) => note.title.includes(query) || note.text.includes(query));
    }

    // Pre: id is valid
    async update(id, { title, text} ) {
        //Find the index of note containing id
        // const index = this.notes.findIndex((note) => note._id === id);


        const note = await Note.findByIdandUpdate(
            id,
            { title, text },
            { new: true }

        );

        if (note === null) {
            throw new ApiError(404, "Thire is no note with the given id");
            
        }



        // if (index === -1) {
        //     throw new ApiError(404, "Thire is no note with the given id");
        // }

        // Update the title or text depending if they exist in the parameter obj
        // if (title !== undefined) {
        //     this.notes[index].title = title;
        // }
        // if (text !== undefined) {
        //     this.notes[index].text = text;
        // }
        // return this.notes[index];

        return note;
    }
    
    // Pre: id is valid
    async delete(id) {
        //Find the index of note containing id
        // const index = this.notes.findIndex((note) => note._id === id);

        const note = await Note.findByIdAndDelete(id);

        if (note === null) {
            throw new ApiError(404, "Thire is no note with the given id");

        }
        // if (index === -1) {
        //     throw new ApiError(404, "Thire is no note with the given id");
        // }
        
        // const note = this.notes[index]; //store note before deleting

        // this.notes.splice(index, 1); //Splice note at index out of notes array
        return note;
    }

}

module.exports = NoteDao; 
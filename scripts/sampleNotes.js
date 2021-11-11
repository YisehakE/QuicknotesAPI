
const db = require("../data/db");
const faker = require("faker");
const NoteDao = require("../data/NoteDao");


// collections (Tables) Folders // notes
// documents (Row) files // each note is a file


async function createSampleNotes() {
    try {
        await db.connect();
        const notes = new NoteDao();

        const note = await notes.create({
            title: faker.lorem.sentence(),
            text: faker.lorem.paragraph(),
            }, (err, note) => {
                console.log(err ? err : note)
            }

        )
        console.log(note)

    } catch(err) {
        console.log(err)
    }
}

createSampleNotes();

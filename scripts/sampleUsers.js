
const db = require("../data/db");
// const faker = require("faker");
const UserDao = require("../data/UserDao");


// collections (Tables) Folders // notes
// documents (Row) files // each note is a file

async function createSampleUsers(username, role) {
    try {
        await db.connect();
        const users = new UserDao();

        const user  = await users.create({
            username: username,
            password: username,
            role: role
        })

        console.log(user)

    } catch(err) {
        console.log(err)
    }
}

createSampleUsers("client1", "CLIENT");
createSampleUsers("client2", "CLIENT");
createSampleUsers("admin1");


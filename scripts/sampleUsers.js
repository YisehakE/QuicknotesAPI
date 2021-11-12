
const db = require("../data/db");
const faker = require("faker");
const UserDao = require("../data/UserDao");


// collections (Tables) Folders // notes
// documents (Row) files // each note is a file

async function createSampleUsers(role) {
    try {
        await db.connect();
        const users = new UserDao();

        const user  = await users.create({
            username: faker.internet.userName(),
            password: faker.internet.password(),
            role: role
        })

        console.log(user)

    } catch(err) {
        console.log(err)
    }
}

createSampleUsers("CLIENT");
createSampleUsers("CLIENT");
createSampleUsers("CLIENT");


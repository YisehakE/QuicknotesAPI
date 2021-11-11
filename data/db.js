require("dotenv").config();

const mongoose = require("mongoose");
// const USERPASS = "7q16MDFxJ3Jt5Uvp";
// const URI = `mongodb+srv://quicknote-admin:${USERPASS}@quicknote.ydsfc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const URI = process.env.DB_URI;

async function connect() {

    try {
        await mongoose.connect(URI);
        console.log("Connect to Mongoose DB");
         
    } catch (err) {
        console.log(err)

    }
}

module.exports = { connect };
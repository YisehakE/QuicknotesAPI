require("dotenv").config();

const mongoose = require("mongoose");
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
// Authentication 
// Authorization

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema( 
    {
        username: { 
            type: String, 
            required: true, 
            unique: true 
        },
        password: { 
            type: String, 
            required: true
        },
        role: {
            type: String,
            enum: ["CLIENT", "ADMIN"],
            required: true
        }
    }
)

const User = mongoose.model("User", UserSchema);


module.exports = User;
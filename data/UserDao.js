const ApiError = require("../model/ApiError");
const User = require("../model/User");
const { hashPassword } = require("../server/util/hashing");


class UserDao {

    // Pre: title must not be empty
    async create( { username, password, role} ) {

        if (username === undefined || username  === "") {
            throw new ApiError(400, "Every User must have a username");
        }

        if (password === undefined || password  === "") {
            throw new ApiError(400, "Every user must have a password!");
        }

        if (role !== "ADMIN" && role  !== "CLIENT") {
            throw new ApiError(400, "Every user must have a valid role!");
        }      

        const hash = await hashPassword(password);

        const user = await User.create({ username, password: hash, role });
        return user;
    }

    async read(id) {
        const user = await User.findById(id);
        return user ? user : [];
    }

     async readOne(username) {
        const user = await User.findOne( { username });
        return user ? user : [];
    }

    async readAll(role = "") {
        if (role !== "") {
            const users = await User.find({ role });
            return users;
        } 

        const users = await User.find({});
        return users;
    }

    async update(id, { password, role} ) {
        const user = await User.findByIdandUpdate(
            id,
            { password, role },
            { new: true, runValidators: true }

        );

        if (user === null) {
            throw new ApiError(404, "Thire is no user with the given id");
            
        }

        return user;
    }
    
    async delete(id) {
        const user = await User.findByIdAndDelete(id);

        if (user === null) {
            throw new ApiError(404, "Thire is no user with the given id");

        }
        return user;
    }
}

module.exports = UserDao; 
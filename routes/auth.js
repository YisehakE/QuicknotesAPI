
const express = require("express");
const UserDao = require("../data/UserDao");
const router = express.Router();

const users = new UserDao();

router.post("/register", async (req, res) => {

    try {
        const { username, password } = req.body;
        const data = await users.create( { username, password, role: "CLIENT"});
        res.status(201).json( { data })
    } catch (err) {
        res.json( { message: err.message} )
    }
});


router.post("/authenticate", async(req, res) => {
    try {
        let { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "You must provide both username and password"
            });
        }

        const user = await users.readOne( username );

        if (user.password === password ) {
            res.status(201).json({
                message: "Authentication success", 
                data: user
            });
        } else { //Let's say user return doesn't equal password typed in
            res.status(403).json({
                message: "Wrong username or password"
            });
        }
        res.status(201).json( { data })
    } catch (err) {
        res.status(err.status || 500).json( { message: err.message} )
    }
});

module.exports = router;
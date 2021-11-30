
const express = require("express");
const UserDao = require("../data/UserDao");
const router = express.Router();
const { verifyPassword } = require("../server/util/hashing");
const { createToken, verifyToken } = require("../server/util/token");



const users = new UserDao();

router.post("/register", async (req, res) => {

    try {
        const { username, password, role} = req.body;
        const data = await users.create( { username, password, role: role});
        res.status(201).json( { data })
    } catch (err) {
        res.json( { message: err.message} )
    }
});


router.post("/authenticate", async(req, res) => {

    const { username, password } = req.body;

    console.log(username)
    console.log(password)

    if (!username || !password) {
        return res.status(400).json({
          message: "You must provide both username and password.",
        });
      }


    try {

        const user = await users.readOne( username );

        //Authentication
        const isAuthenticated = await verifyPassword(password, user ? user.password : "");
        if (!isAuthenticated) {
            return res.status(403).json({
                message:"Wrong username or password!",
            });
        } else {
            const token = createToken(user);
            return res.json(
                {
                    message: "Authentication successful!",
                    token: token,
                });
        }
    
    } catch (err) {
        res.status(err.status || 500).json( { message: err.message} )
    }
});

router.post("/verify", async (req, res) => {
    const { token } = req.body;
    const isValid = await verifyToken(token);
  
    if (!isValid) {
      return res.status(403).json({
        message: "Invalid or expired token!",
      });
    }
  
    return res.json({
      message: "Token verified, and it is valid!",
      token: token,
    });
  });

module.exports = router;
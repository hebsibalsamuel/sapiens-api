const router = require("express").Router();
const { domainToASCII } = require("url");
const User = require("../models/user");


router.get("/", async (req, res) => {
    const query = req.query.new;
    try {
        const users = await User.find()
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        let username = req.body.userName;
        let password = req.body.password;
        let canLogIn = false
        const users = await User.findOne({ userName: username })
        if(users && users.password==password){
            canLogIn = true;
        }
        res.status(200).json(canLogIn);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

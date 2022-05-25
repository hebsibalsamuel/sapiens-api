const router = require("express").Router();
const CryptoJS = require("crypto-js");
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

router.post("/register", async (req, res) => {
    const newUser = new User({
      userName: req.body.userName,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
  
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
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
        const hashedPassword = CryptoJS.AES.decrypt(
            users.password,
            process.env.PASS_SEC
        );
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(users && originalPassword==password){
            canLogIn = true;
        }
        res.status(200).json(canLogIn);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

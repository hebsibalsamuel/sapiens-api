const router = require("express").Router();
const User = require("../models/User");


router.get("/", async (req, res) => {
    const query = req.query.new;
    try {
        const users = await User.find()
        // const cart = await User.findOne({ userName: req.params.userId });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

const router = require("express").Router();
const ThemeData = require("../models/themeData");


router.get("/", async (req, res) => {
    try {
        const userData = await ThemeData.find()
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:username", async (req, res) => {
    try {      
        const userData = await ThemeData.findOne({ userName: req.params.username})
        res.status(200).json(userData);
        console.log(userData, req.params.username)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/add", async (req, res) => {
    try {
        const userData = new ThemeData({
            'userName': 'Dave',
            'colorTheme': 'teal'
        })
        let data = await userData.save()
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await ThemeData.findByIdAndUpdate(
            id, updatedData, options
        )

        res.status(200).send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;

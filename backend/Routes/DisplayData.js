const express = require("express");
const router = express.Router();

router.post('/foodData', async (req, res) => {
    try {
        if (!global.food_items || global.food_items.length === 0) {
            return res.status(404).json({ message: "No food items found" });
        }
        if (!global.foodCategory || global.foodCategory.length === 0) {
            return res.status(404).json({ message: "No food categories found" });
        }
        res.send([global.food_items, global.foodCategory]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;

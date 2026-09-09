const express = require("express");
const { client } = require("../db");

const router = express.Router();
router.get("/test", (req, res) => {
    res.send("CONTACT ROUTE IS WORKING!");
});

router.post("/", async (req, res) => {
    console.log("CONTACT ROUTE HIT!");

    try {
        const { name, email, message } = req.body;

        console.log("Received data:", {
            name,
            email,
            message
        });

        const database = client.db("portfolio");
        const contacts = database.collection("contacts");

        await contacts.insertOne({
            name: name,
            email: email,
            message: message,
            createdAt: new Date()
        });

        console.log("Message saved to MongoDB!");

        res.status(201).json({
            success: true,
            message: "Message saved successfully!"
        });

    } catch (error) {
        console.error("MongoDB ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

module.exports = router;
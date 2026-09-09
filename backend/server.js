const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");
const contactRoutes = require("./routes/contact");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Contact API
app.use("/api/contact", contactRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("Portfolio Backend is Running!");
});

// Start server
const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
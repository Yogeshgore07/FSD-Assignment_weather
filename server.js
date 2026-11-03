const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// API endpoint to get stored weather readings from weather.json
app.get("/api/weather", (req, res) => {
  const dataPath = path.join(__dirname, "weather.json");
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read weather data" });
    }
    res.json(JSON.parse(data));
  });
});

// Serve index.html for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Weather Station server running on port ${PORT}`);
});


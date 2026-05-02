const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// API Endpoint to serve user data
app.get('/api/users', (req, res) => {
    fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read data" });
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

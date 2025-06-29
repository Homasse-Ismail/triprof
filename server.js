const express = require('express');
const app = express();
const PORT = 6000;

// Correction ici : app.get au lieu de app.route
app.get("/t", (req, res) => {
    res.send('hello test');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

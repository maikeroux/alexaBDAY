const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Fix for serving mp3, wav, ogg properly
app.use(express.static(__dirname, {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith(".mp3")) {
            res.setHeader("Content-Type", "audio/mpeg");
        }
        if (filePath.endsWith(".wav")) {
            res.setHeader("Content-Type", "audio/wav");
        }
        if (filePath.endsWith(".ogg")) {
            res.setHeader("Content-Type", "audio/ogg");
        }
    }
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

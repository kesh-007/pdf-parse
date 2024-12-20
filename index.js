const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const cors = require('cors');
const path = require('path');


const app = express();
app.use(express.json())
app.use(cors())
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload-pdf', upload.single('pdf'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const pdfBuffer = req.file.buffer;
    const data = await pdfParse(pdfBuffer);

    res.status(200).json({
      message: 'PDF parsed successfully!',
      text: data.text,
    });
  } catch (error) {
    console.error('Error parsing PDF:', error);
    res.status(500).send('Error parsing PDF.');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

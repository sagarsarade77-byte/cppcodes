
const express = require("express");
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 3000;

// Serve frontend files
app.use(express.static(__dirname));

// Configure image upload
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

// Background removal API route
app.post("/api/remove-background", upload.single("image"), async (req, res) => {

    try {

        if (!process.env.REMOVE_BG_API_KEY) {
            return res.status(500).json({
                error: "API key is missing. Check your .env file."
            });
        }

        if (!req.file) {
            return res.status(400).json({
                error: "Please upload an image."
            });
        }

        const formData = new FormData();

        const imageBlob = new Blob(
            [req.file.buffer],
            { type: req.file.mimetype }
        );

        formData.append("image_file", imageBlob, req.file.originalname);
        formData.append("size", "auto");

        const response = await fetch(
            "https://api.remove.bg/v1.0/removebg",
            {
                method: "POST",
                headers: {
                    "X-Api-Key": process.env.REMOVE_BG_API_KEY
                },
                body: formData
            }
        );

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error("API Error:", errorMessage);

            return res.status(response.status).json({
                error: "Background removal failed. Check your API key and account."
            });
        }

        const result = Buffer.from(
            await response.arrayBuffer()
        );

        res.setHeader("Content-Type", "image/png");
        res.send(result);

    } catch (error) {

        console.error("Server Error:", error);

        res.status(500).json({
            error: "Something went wrong on the server."
        });

    }

});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

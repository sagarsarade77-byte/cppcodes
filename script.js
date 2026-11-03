
// Get HTML Elements

const imageInput = document.getElementById("imageInput");
const uploadBtn = document.getElementById("uploadBtn");
const uploadBox = document.getElementById("uploadBox");

const previewSection = document.getElementById("previewSection");
const originalImage = document.getElementById("originalImage");
const resultImage = document.getElementById("resultImage");

const removeBtn = document.getElementById("removeBtn");
const downloadBtn = document.getElementById("downloadBtn");
const statusText = document.getElementById("status");


// Variables

let selectedFile = null;
let originalImageURL = null;
let resultImageURL = null;


// Open File Selector

uploadBtn.addEventListener("click", () => {
    imageInput.click();
});


// Select Image

imageInput.addEventListener("change", (event) => {

    const file = event.target.files[0];

    handleImage(file);

});


// Handle Uploaded Image

function handleImage(file) {

    if (!file) return;

    // Check file type

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        alert("Please upload a JPG, PNG or WEBP image.");
        return;
    }

    // Check file size (10 MB)

    if (file.size > 10 * 1024 * 1024) {
        alert("Please upload an image smaller than 10 MB.");
        return;
    }

    selectedFile = file;

    // Remove previous image URLs

    if (originalImageURL) {
        URL.revokeObjectURL(originalImageURL);
    }

    if (resultImageURL) {
        URL.revokeObjectURL(resultImageURL);
        resultImageURL = null;
    }

    // Create image preview

    originalImageURL = URL.createObjectURL(file);

    originalImage.src = originalImageURL;

    resultImage.removeAttribute("src");

    downloadBtn.hidden = true;

    previewSection.style.display = "block";

    statusText.textContent = "Image uploaded successfully!";

}


// Drag and Drop Functionality

uploadBox.addEventListener("dragover", (event) => {

    event.preventDefault();

    uploadBox.classList.add("dragover");

});


uploadBox.addEventListener("dragleave", () => {

    uploadBox.classList.remove("dragover");

});


uploadBox.addEventListener("drop", (event) => {

    event.preventDefault();

    uploadBox.classList.remove("dragover");

    const file = event.dataTransfer.files[0];

    handleImage(file);

});


// Remove Background

removeBtn.addEventListener("click", async () => {

    if (!selectedFile) {

        alert("Please upload an image first.");

        return;

    }

    removeBtn.disabled = true;

    removeBtn.textContent = "Processing...";

    statusText.textContent = "Removing background. Please wait...";

    try {

        const formData = new FormData();

        formData.append("image", selectedFile);

        const response = await fetch("/api/remove-background", {

            method: "POST",

            body: formData

        });

        if (!response.ok) {

            throw new Error("Background removal failed.");

        }

        const resultBlob = await response.blob();

        if (resultImageURL) {
            URL.revokeObjectURL(resultImageURL);
        }

        resultImageURL = URL.createObjectURL(resultBlob);

        resultImage.src = resultImageURL;

        downloadBtn.href = resultImageURL;

        downloadBtn.hidden = false;

        statusText.textContent = "Background removed successfully!";

    }

    catch (error) {

        statusText.textContent =
            "Could not process image. Please check your backend connection.";

        console.error(error);

    }

    finally {

        removeBtn.disabled = false;

        removeBtn.textContent = "Remove Background";

    }

});

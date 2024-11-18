<script setup>
import { ref } from "vue";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; // Firestore imports
import { storage, db } from "@/firebase/init"; // Initialize Firebase

// Reactive references
let uploadedImages = ref([]);
let imagePreviews = ref([]);
let fileInput = ref(null);
let workTitle = ref("");
let workDescription = ref("");

// Handle image uploads
function onUploadImg(event) {
  const files = Array.from(event.target.files); // Convert FileList to Array

  files.forEach((file) => {
    // Generate a preview URL
    const previewURL = URL.createObjectURL(file);
    imagePreviews.value.push(previewURL);

    // Add the file to the upload queue
    uploadedImages.value.push(file);
  });

  // Reset the file input after processing files
  resetFileInput();
}

// Remove image when clicked
function removeImage(index) {
  const previewURL = imagePreviews.value[index];
  URL.revokeObjectURL(previewURL);

  // Remove from arrays
  imagePreviews.value.splice(index, 1);
  uploadedImages.value.splice(index, 1);

  resetFileInput();
}

// Reset the file input value
function resetFileInput() {
  if (fileInput.value) {
    fileInput.value.value = "";
  }
}

// Upload images and save data in Firestore
async function uploadImages() {
  if (!workTitle.value || !workDescription.value || uploadedImages.value.length === 0) {
    alert("Please fill out all fields and upload images.");
    return;
  }

  try {
    const uploadedUrls = []; // Array to store image URLs

    // Upload images to Firebase Storage
    for (const image of uploadedImages.value) {
      const storagePath = `images/${workTitle.value}/${image.name}`;
      const storageReference = storageRef(storage, storagePath);
      const snapshot = await uploadBytes(storageReference, image);
      const downloadURL = await getDownloadURL(snapshot.ref);
      uploadedUrls.push(downloadURL);
    }

    // Prepare metadata
    const workData = {
      title: workTitle.value,
      description: workDescription.value,
      images: uploadedUrls,
      createdAt: new Date(),
    };

    // Add metadata to Firestore
    const docRef = await addDoc(collection(db, "works"), workData);
    alert("Work added successfully!");
    console.log("Work saved:", { ...workData, id: docRef.id });

    // Clear inputs
    uploadedImages.value = [];
    imagePreviews.value = [];
    workTitle.value = "";
    workDescription.value = "";
    resetFileInput();
  } catch (error) {
    console.error("Error uploading images:", error);
    alert("An error occurred while saving the work.");
  }
}
</script>


<template>
  <div class="wrapper">
    <div class="main-title">my profile</div>

    <div class="card-wrapper">
      <div class="title">Add Work</div>

      <div class="content">
        <!-- Title and Description -->
        <input type="text" placeholder="Work title" v-model="workTitle" />
        <textarea rows="5" placeholder="About work" v-model="workDescription"></textarea>

        <!-- Image Upload -->
        <input
          ref="fileInput"
          @change="onUploadImg"
          accept="image/*"
          type="file"
          multiple
        />

        <!-- Image Previews -->
        <div class="images-container">
          <div
            v-for="(preview, index) in imagePreviews"
            :key="index"
            class="image-preview"
            @click="removeImage(index)"
          >
            <img :src="preview" alt="Preview" />
          </div>
        </div>

        <!-- Submit Button -->
        <button @click="uploadImages">Add Work</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 50px;
}
.loaded-img {
  width: 100px !important;
}
.main-title {
  font-family: sectionTitleFont;
  font-size: 20px;
  color: var(--vt-c-black);
  padding-top: 20px;
  padding-left: 30px;
}
.title {
  font-size: 20px;
  font-weight: bold;
}
.card-wrapper {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  background-color: white;
  padding: 10px;
  gap: 10px;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
textarea {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  resize: vertical;
}
.images-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.image-preview {
  position: relative;
  width: 100px;
  height: 100px;
}
.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.image-preview:hover {
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}
</style>

<script setup>
import { ref } from "vue";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { collection, query, getDocs, doc, setDoc, updateDoc } from "firebase/firestore"; // Firestore imports
import { storage, db } from "@/firebase/init"; // Initialize Firebase

// Reactive references
let uploadedImage = ref(null); // Single image
let imagePreview = ref(null);  // Single preview
let fileInput = ref(null);

// Assume you have a user ID (it could be from Firebase Authentication or any unique identifier)
const userId = "user123"; // Example user ID

// Handle image uploads
function onUploadImg(event) {
  const file = event.target.files[0]; // Only take the first image (single upload)

  if (file) {
    // Generate a preview URL
    const previewURL = URL.createObjectURL(file);
    imagePreview.value = previewURL;  // Update the preview

    // Set the uploaded image
    uploadedImage.value = file;  // Only one image is allowed

    // Reset the file input after processing files (for the next upload)
    resetFileInput();
  }
}

// Remove image when clicked
function removeImage() {
  if (imagePreview.value) {
    // Revoke the object URL to free up resources
    URL.revokeObjectURL(imagePreview.value);
  }

  // Reset image data
  uploadedImage.value = null;
  imagePreview.value = null;

  resetFileInput(); // Reset input for next file selection
}

// Reset the file input value
function resetFileInput() {
  if (fileInput.value) {
    fileInput.value.value = ""; // Clear the input
  }
}

// Upload image and save data to Firestore
async function uploadImage() {
  if (!uploadedImage.value) {
    alert("Please upload an image.");
    return;
  }

  try {
    // Check if a profile document already exists
    const profileQuery = query(collection(db, "profile"));
    const querySnapshot = await getDocs(profileQuery);

    let profileDocRef;
    if (querySnapshot.empty) {
      // No profile document exists, create a new one
      profileDocRef = doc(db, "profile", userId);  // Create a new document with the user's ID
    } else {
      // Profile document exists, use the first document
      profileDocRef = querySnapshot.docs[0].ref;
    }

    // Upload the image to Firebase Storage
    const storagePath = `profileimage/${uploadedImage.value.name}`;
    const storageReference = storageRef(storage, storagePath);
    const snapshot = await uploadBytes(storageReference, uploadedImage.value);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Now update or set the profile document with the new profile picture URL
    await setDoc(profileDocRef, {
      profilePicture: downloadURL,  // Save the new image URL (will overwrite if updating)
    }, { merge: true });  // Merge to avoid overwriting other fields

    alert("Profile picture updated successfully!");
    console.log("Profile updated with new image URL:", downloadURL);

    // Clear everything after successful upload
    uploadedImage.value = null;
    imagePreview.value = null;
    resetFileInput();
  } catch (error) {
    console.error("Error uploading image:", error);
    alert("An error occurred while uploading the image.");
  }
}
</script>

<template>
  <div class="wrapper">

    <div class="card-wrapper">
      <div class="title">Change profile picture</div>

      <div class="content">

        <!-- Image Upload -->
        <input
          ref="fileInput"
          @change="onUploadImg"
          accept="image/*"
          type="file"
          :disabled="uploadedImage !== null"
        />

        <!-- Image Preview -->
        <div v-if="imagePreview" class="images-container">
          <div class="image-preview" @click="removeImage">
            <img :src="imagePreview" alt="Preview" />
          </div>
        </div>

        <!-- Submit Button -->
        <button @click="uploadImage" :disabled="!uploadedImage">Update Profile Picture</button>
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

.card-wrapper {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  background-color: white;
  padding: 10px;
  gap: 10px;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.images-container {
  display: flex;
  justify-content: center;
  align-items: center;
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

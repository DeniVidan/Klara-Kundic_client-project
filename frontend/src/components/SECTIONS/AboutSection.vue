<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, ref } from "vue";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/init"; // Initialize Firebase

gsap.registerPlugin(ScrollTrigger);

// Reactive variable to hold the image URL
let profileImageUrl = ref("");

// Assume you have a user ID (it could be from Firebase Authentication or any unique identifier)
const userId = "user123"; // Example user ID

// Fetch the profile image URL from Firestore
async function fetchProfileImage() {
  try {
    const profileDocRef = doc(db, "profile", userId); // Reference to the profile document
    const profileDoc = await getDoc(profileDocRef);

    if (profileDoc.exists()) {
      profileImageUrl.value = profileDoc.data().profilePicture; // Set the image URL
    } else {
      console.log("No profile found");
    }
  } catch (error) {
    console.error("Error fetching profile image:", error);
  }
}

// GSAP animation setup
onMounted(() => {
  fetchProfileImage(); // Fetch profile image on mount

  let sections = gsap.utils.toArray(".item-in-anim");
  let quotation_marks = gsap.utils.toArray(".quotation-mark-1, .quotation-mark-2");
  quotation_marks.forEach(quote => {
    gsap.from(quote, {
      scrollTrigger: {
        trigger: quote,
        start: "center bottom",
      },
      opacity: 0,
      y: 100,
      stagger: 0.2,
    });
  });

  sections.forEach((section, index) => {
    gsap.from(section.childNodes, {
      scrollTrigger: {
        trigger: section,
        start: "center bottom",
        toggleActions: "play play pause reverse",
      },
      opacity: 0,
      y: 100,
      stagger: 0.2,
    });
  });
});
</script>

<template>
  <div class="wrapper">
    <div class="shape"></div>
    <div class="first-part item-in-anim">
      <div class="title">I'm Klara</div>
      <div class="about-image">
        <!-- Dynamically bind the profile image URL to the src attribute -->
        <img :src="profileImageUrl" alt="Profile Image" v-if="profileImageUrl" />
      </div>
    </div>

    <div class="second-part">
      <div class="quotation-mark-1">
        <img src="@/assets/images/quote1.png" alt="" />
      </div>
      <div class="quotation-mark-2">
        <img src="@/assets/images/quote2.png" alt="" />
      </div>

      <p class="item-in-anim">
        <span>
          <strong>Vašu ljubavnu priču</strong> pretvaram u umjetnost, potez po
          potez. <br /> <br>
          <strong>Skicama uživo na dan vjenčanja</strong> stvaram bezvremenska djela
          koja pričaju vašu priču.
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "Times New Roman", serif;
}
strong {
  font-weight: bold;
  color: var(--beige-detail-color);
}
.wrapper {
  color: var(--vt-c-white-soft);
  min-height: 100vh;
  width: 100%;
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
  gap: 400px;
}
.shape {
  width: 200%;
  height: 40vh;
  background-color: #bdae9a;
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;
  position: absolute;
  left: -50%;
  z-index: 0;
}
.first-part {
  display: flex;
  flex-direction: column;
  gap: 50px;
  position: relative;
  padding-top: 150px;
}
.second-part {
  position: relative;
  top: 0;
}
.title {
  font-family: sectionTitleFont;
  font-size: 60px;
  color: var(--vt-c-black);
  margin-left: 45px;
}
.about-image {
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;
}
.about-image img {
  width: 350px;
  height: 500px;
  object-fit: cover;
  position: absolute;
}
.second-part p {
  display: flex;
  align-items: center;
  height: 80vh;
  margin: 0px 20px;
  font-size: 1.5rem;
  line-height: 1.3;
  color: var(--vt-c-black);
}

.quotation-mark-1 {
  position: absolute;
  top: 10px;
  left: -100px;
}
.quotation-mark-2 {
  position: absolute;
  bottom: 10px;
  right: -100px;
}

@media (min-width: 1024px) {
  .title {
    font-size: 150px;
    line-height: 0.6;
    width: 50%;
    text-align: end;
  }
  .shape {
    display: none;
  }
  .first-part {
    padding-top: 50px;
    flex-direction: row;
  }
  .about-image {
  width: 50%;
}
.second-part {
  width: 50%;
  transform: translateY(-500px);
}
.second-part p {
  margin: auto;
  width: 80%;
  font-size: 1.8rem;
}
.quotation-mark-1 {
  position: absolute;
  top: 100px;
}
.quotation-mark-2 {
  bottom: 120px;
}
.wrapper {
  height: 60vh;
}
}
@media (min-width: 1280px) {
  .second-part {
  transform: translateY(-500px)
            translateX(200px);
}
}
@media (min-width: 1900px) {
  .second-part {
    width: 40%;
  transform: translateY(-500px)
            translateX(400px);
}
}
</style>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getCurrentUser } from "@/firebase/init";
import { collection, doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/init";
import FooterSection from "@/components/SECTIONS/FooterSection.vue";
import CallToAction from "@/components/braker/CallToAction.vue";

const props = defineProps({
  id: String,
});

const route = useRoute();
const router = useRouter();
const work = ref(null);
const images = ref([]);
const carousel = ref(null);
const currentIndex = ref(0);
const itemWidth = ref(0);
const containerWidth = ref(0);
const startX = ref(0);
let user = ref(null);

// Fetch work data by ID
async function fetchWorkById(id) {
  try {
    const docRef = doc(collection(db, "works"), id);
    const workSnapshot = await getDoc(docRef);
    if (workSnapshot.exists()) {
      work.value = { id: workSnapshot.id, ...workSnapshot.data() };
      images.value = work.value.images || []; // Default to an empty array if no images
    } else {
      console.error("No such work found!");
    }
  } catch (error) {
    console.error("Error fetching work:", error);
  }
}

// Delete the currently opened work
async function deleteWork() {
  const confirmed = window.confirm(
    "Are you sure you want to delete this work? This action cannot be undone."
  );
  if (confirmed) {
    try {
      const docRef = doc(collection(db, "works"), props.id);
      await deleteDoc(docRef);
      alert("Work deleted successfully.");
      router.push("/mywork"); // Redirect to a different page after deletion
    } catch (error) {
      console.error("Error deleting work:", error);
      alert("Failed to delete the work. Please try again.");
    }
  }
}

// Update the carousel position
function updateCarousel() {
  if (!images.value.length) return;

  const maxIndex = images.value.length - 1;
  if (currentIndex.value < 0) {
    currentIndex.value = 0;
  } else if (currentIndex.value > maxIndex) {
    currentIndex.value = maxIndex;
  }

  const translateX =
    -currentIndex.value * itemWidth.value +
    (containerWidth.value - itemWidth.value) / 2;

  if (carousel.value) {
    carousel.value.style.transform = `translateX(${translateX}px)`;
  }
}

// Move carousel left or right
function moveCarousel(direction) {
  if (!images.value.length) return;
  currentIndex.value += direction;
  updateCarousel();
}

// Drag functionality
function startDrag(e) {
  startX.value = e.touches ? e.touches[0].clientX : e.clientX;
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchmove", drag);
  document.addEventListener("touchend", endDrag);
}

function drag(e) {
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  const delta = x - startX.value;
  const translateX =
    -currentIndex.value * itemWidth.value +
    (containerWidth.value - itemWidth.value) / 2 +
    delta;

  if (carousel.value) {
    carousel.value.style.transform = `translateX(${translateX}px)`;
  }
}

function endDrag(e) {
  const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
  const delta = x - startX.value;

  if (Math.abs(delta) > itemWidth.value / 4) {
    currentIndex.value -= Math.sign(delta);
  }
  updateCarousel();

  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", endDrag);
  document.removeEventListener("touchmove", drag);
  document.removeEventListener("touchend", endDrag);
}

onMounted(async () => {
  user.value = await getCurrentUser();
  console.log("user:", user.value);
  await fetchWorkById(props.id);

  if (carousel.value && images.value.length) {
    const firstItem = carousel.value.querySelector(".carousel-item");
    if (firstItem) {
      itemWidth.value = firstItem.offsetWidth;
    }
    containerWidth.value = document.querySelector(".carousel-container").offsetWidth;

    updateCarousel();

    carousel.value.addEventListener("mousedown", startDrag);
    carousel.value.addEventListener("touchstart", startDrag);
  }
});
</script>

<template>
  <div class="wrapper-work">
    <div class="carousel-container">
      <button
        :class="['arrow', 'arrow-left', { disabled: currentIndex === 0 }]"
        @click="moveCarousel(-1)"
      >
        ❮
      </button>

      <div class="carousel" ref="carousel">
        <div
          v-for="(image, index) in images"
          :key="index"
          :class="['carousel-item', { active: index === currentIndex }]"
        >
          <img :src="image" alt="" />
        </div>
      </div>

      <button
        :class="[ 'arrow', 'arrow-right', { disabled: currentIndex === images.length - 1 } ]"
        @click="moveCarousel(1)"
      >
        ❯
      </button>
    </div>
    <div v-if="user" class="edit-buttons">
      <img src="@/assets/images/edit.png" alt="edit button">
      <img src="@/assets/images/delete.png" @click="deleteWork" alt="delete buton">
    </div>
    <div v-if="work?.title" class="text-content-wrapper">
      <div class="main-content-wrapper">
        <div class="item-title">{{ work.title }}</div>
        <div class="content">{{ work.description }}</div>
      </div>

      <div class="about-work">
        <div class="title-2">About this work</div>
        <div class="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          excepturi enim, veniam beatae quisquam consequatur porro reprehenderit
          mollitia iure tempora provident sit corrupti quos soluta dolorem quam
          nemo amet ullam!
        </div>
      </div>
      <CallToAction style="margin-top: 50px" />
      
    </div>
    <FooterSection style="margin-top: 100px" />
  </div>
</template>


<style scoped>
.wrapper-work {
  background-color: var(--color-background);
  color: var(--vt-c-white-soft);
  min-height: 100vh;
  width: 100vw;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 50px;
}
.edit-buttons {
  color: var(--vt-c-white-soft);
  display: flex;
  gap: 10px;
  width: 100%;
  margin-left: 50px;
}
.edit-buttons img {
  padding: 10px 15px;
  object-fit: contain;
}
.carousel-container {
  position: relative;
  width: 100vw;
  /* overflow: hidden; */
}

.carousel {
  display: flex;
  transition: transform 0.5s ease;
  scroll-snap-type: x mandatory;
}

.carousel-item {
  position: relative;
  min-width: 100vw;
  flex-shrink: 0;
  height: 50vh;
  background-color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  scroll-snap-align: center;
  transition: opacity 0.5s;
  opacity: 0.5; /* Start with lower opacity */
}

.carousel-item.active {
  opacity: 1; /* Center item fully visible */
}
.carousel-item img {
  height: 100%;
  width: 100%;
  position: absolute;
  object-fit: cover;
}
.item-title {
  text-align: start;
  font-family: sectionTitleFont;
  font-size: 60px;
  margin-left: 30px;
  color: var(--vt-c-black);
}
.content {
  color: black;
  padding: 0px 30px;
}
.text-content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
}
.title-2 {
  font-family: sectionTitleFont;
  font-size: 40px;
  color: var(--vt-c-black);
  margin-left: 30px;
}
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  color: var(--vt-c-black);
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 30px;
  z-index: 1;
}
.arrow:focus {
  text-decoration: none;
}

.arrow-left {
  left: 10px;
}

.arrow-right {
  right: 10px;
}

.arrow.disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
@media (min-width: 1024px) {
  .carousel-item {
    height: 80vh;
    background-color: rgb(29, 29, 29);
  }
  .carousel-item img {
    object-fit: contain;
  }
  .arrow {
    color: white;
  }

  .text-content-wrapper {
    width: 80%;
    gap: 100px
  }
  .item-title {
    font-size: 90px;
  }
  .title-2 {
    font-size: 60px;
  }
}
</style>

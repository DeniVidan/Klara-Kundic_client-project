<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { gsap } from "gsap";
import { servicesData } from "@/store/store.js";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/init"; // Import Firestore instance

let services = ref([...servicesData]); // Start with hardcoded data

// Create refs for carousel and track elements
const carousel = ref(null);
const currentIndex = ref(0);

const itemWidth = ref(0);
const containerWidth = ref(0);
let startX;

// Fetch services from Firebase
async function fetchServices() {
  try {
    const servicesCollection = collection(db, "services");
    const servicesSnapshot = await getDocs(servicesCollection);
    const fetchedServices = servicesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Add fetched services to the reactive `services` array
    services.value = [...fetchedServices];
  } catch (error) {
    console.error("Error fetching services:", error);
  }
}

// Functions to update carousel position and apply fade effect
function updateCarousel() {
  const maxIndex = services.value.length - 1;
  if (currentIndex.value <= 0) {
    currentIndex.value = 0;
  } else if (currentIndex.value >= maxIndex) {
    currentIndex.value = maxIndex;
  }

  // Calculate the translateX to center the current item
  const translateX =
    -currentIndex.value * itemWidth.value +
    (containerWidth.value - itemWidth.value) / 2;
  carousel.value.style.transform = `translateX(${translateX}px)`;
}

// Move carousel left or right
function moveCarousel(direction) {
  currentIndex.value += direction;
  updateCarousel();
}

// Drag functionality
function startDrag(e) {
  startX = e.touches ? e.touches[0].clientX : e.clientX;
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchmove", drag);
  document.addEventListener("touchend", endDrag);
}

function drag(e) {
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  const delta = x - startX;
  const translateX =
    -currentIndex.value * itemWidth.value +
    (containerWidth.value - itemWidth.value) / 2 +
    delta;
  carousel.value.style.transform = `translateX(${translateX}px)`;
}

function endDrag(e) {
  const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
  const delta = x - startX;
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
  await fetchServices(); // Fetch services from Firebase

  itemWidth.value =
    carousel.value.querySelector(".carousel-item").offsetWidth + 20; // including gap
  containerWidth.value = document.querySelector(
    ".carousel-container"
  ).offsetWidth;

  // Initial update
  updateCarousel();

  // Add drag event listeners
  carousel.value.addEventListener("mousedown", startDrag);
  carousel.value.addEventListener("touchstart", startDrag);

  gsap.from(".title-in-anim", {
    scrollTrigger: {
      trigger: ".title-in-anim",
      //markers: true,
      start: "center bottom",
      toggleActions: "play play pause reverse",
    },
    opacity: 0,
  });
});

onUnmounted(() => {});
</script>
<template>
  <div class="wrapper">
    <div class="title title-in-anim">what i offer...</div>
    <div class="carousel-container">
      <!--       <button
        :class="['arrow', 'arrow-left', { disabled: currentIndex === 0 }]"
        @click="moveCarousel(-1)"
      >
        ❮
      </button> -->

      <div class="carousel" ref="carousel">
        <div
          v-for="(service, index) in services"
          :key="index"
          :class="['carousel-item', { active: index === currentIndex }]"
        >
          <div class="layer"></div>
          <img :src="service.image" alt="" />
          <div class="item-title">
            {{ service.title }}
          </div>
          <div class="item-text">{{ service.description }}</div>
        </div>
      </div>

      <!-- 
      <button
        :class="[
          'arrow',
          'arrow-right',
          { disabled: currentIndex === services.length - 1 },
        ]"
        @click="moveCarousel(1)"
      >
        ❯
      </button> -->
    </div>
    <div class="desktop-items">
      <div class="items-wrapper">
        <div
          class="item-desktop"
          v-for="(service, index) in services"
          :key="index"
        >
          <div class="layer"></div>
          <img :src="service.image" alt="" />
          <div class="item-title">
            {{ service.title }}
          </div>
          <div class="item-text">{{ service.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-color: var(--color-background);
  color: var(--vt-c-white-soft);
  min-height: 100vh;
  /* max-height: 100vh; */
  width: 100vw;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  gap: 50px;
}
.desktop-items {
  display: none;
}
.title {
  text-align: center;
  font-family: sectionTitleFont;
  font-size: 60px;
  color: var(--vt-c-black);
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
  gap: 20px;
}

.carousel-item {
  position: relative;
  min-width: 80vw;
  flex-shrink: 0;
  height: 300px;
  background-color: #ddd;
  border-radius: 10px;
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
  border-radius: 10px;
}
.layer {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.7567401960784313) 8%,
    rgba(0, 0, 0, 0) 49%
  );
  width: 100%;
  z-index: 1;
  height: 100%;
}
.item-title {
  z-index: 3;
  font-size: 30px;
  color: white;
  position: absolute;
  bottom: 0px;
}
.item-text {
  position: absolute;
  color: black;
  font-size: 16px;
  top: 350px;
  z-index: 10;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  line-clamp: 4;
  -webkit-box-orient: vertical;
  text-align: center;
  padding: 0px 10px;
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
  z-index: 10;
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
  .desktop-items {
    width: 100vw;
    display: flex;
    position: relative;
    flex-direction: row;
  }
  .item-desktop {
    position: relative;
    width: 400px;
    height: 400px;
    border-radius: 10px;
  }
  .items-wrapper {
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
  }
  .desktop-items img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .carousel-container {
    display: none;
  }
  .item-title {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .item-text {
    top: 450px;
  }
}
</style>

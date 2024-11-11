<script setup>
import { onMounted, onUnmounted, ref, render } from "vue";
import { useRouter, useRoute } from "vue-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import TextLoop from "@/components/braker/TextLoop.vue";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

defineProps({});

const router = useRouter();
const route = useRoute();

let services = [
  {
    name: "service1",
    image: "src/assets/images/service1.jpg",
    alt: "image",
  },
  {
    name: "service2",
    image: "src/assets/images/service2.jpg",
    alt: "image",
  },
];

onMounted(() => {
  const carousel = document.querySelector(".carousel");
  const track = document.querySelector(".carousel-track");

  let isDragging = false;
  let startX, scrollLeft;
  let velocity = 0;
  let lastX, lastTime;
  let animationFrame;

  carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    velocity = 0;
    lastX = e.pageX;
    lastTime = Date.now();
    track.style.cursor = "grabbing";
    cancelAnimationFrame(animationFrame); // Stop any ongoing inertia
    e.preventDefault(); // Prevents selecting text
  });

  carousel.addEventListener("mouseleave", endDrag);
  carousel.addEventListener("mouseup", endDrag);

  carousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust speed here
    carousel.scrollLeft = scrollLeft - walk;

    // Calculate velocity
    const now = Date.now();
    const deltaTime = now - lastTime;
    if (deltaTime > 0) {
      velocity = (x - lastX) / deltaTime;
      lastX = x;
      lastTime = now;
    }
  });

  carousel.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    velocity = 0;
    lastX = e.touches[0].pageX;
    lastTime = Date.now();
    cancelAnimationFrame(animationFrame);
  });

  carousel.addEventListener("touchend", endDrag);
  carousel.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carousel.scrollLeft = scrollLeft - walk;

    // Calculate velocity
    const now = Date.now();
    const deltaTime = now - lastTime;
    if (deltaTime > 0) {
      velocity = (x - lastX) / deltaTime;
      lastX = x;
      lastTime = now;
    }
  });

  function endDrag() {
    isDragging = false;
    track.style.cursor = "grab";

    // Apply inertia based on velocity
    applyInertia();
  }

  function applyInertia() {
    if (Math.abs(velocity) > 0.1) {
      // Threshold to stop the inertia effect
      carousel.scrollLeft -= velocity * 20; // Adjust multiplier for distance
      velocity *= 0.95; // Friction effect, adjust for faster/slower stopping
      animationFrame = requestAnimationFrame(applyInertia);
    } else {
      cancelAnimationFrame(animationFrame);
    }
  }
});

onUnmounted(() => {});
</script>
<template>
  <div class="wrapper">
    <div class="title">what i offer</div>
    <div class="carousel">
      <div class="carousel-track">

        


        <div v-for="service in services" class="carousel-item">
            <div class="layer"></div>
            <img :src="service.image" alt="" />
            <div class="card-title">{{ service.name }}</div>
        </div>


        <!-- Add more items as needed -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
  background-color: var(--color-background);
}
.title {
  font-family: sectionTitleFont;
  font-size: 60px;
  color: var(--vt-c-black);
  text-align: center;
  padding-bottom: 50px;
}
.carousel {
  overflow: hidden;
  width: 100%;
  max-width: 800px;
  position: relative;
}

.carousel-track {
  display: flex;
  gap: 10px;
  transition: transform 0.6s ease;
  scroll-behavior: smooth;
}

.carousel-item {
  min-width: 350px;
  min-height: 400px;
  background: #eee;
  text-align: center;
  border-radius: 25px;
  user-select: none;
  position: relative;
}
.carousel-item img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: absolute;
  border-radius: 25px;
  top: 0;
  left: 0;
  z-index: 0;
}
.layer {
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7567401960784313) 8%, rgba(0,0,0,0) 49%);
    height: 100%;
    width: 100%;
    position: absolute;
    border-radius: 25px;
    top: 0;
    left: 0;
    z-index: 1;
}
.card-title {
    color: white;
  font-size: 50px;
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  z-index: 2;
}
</style>

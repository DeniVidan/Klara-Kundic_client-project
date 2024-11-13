<script setup>
import { onMounted, onUnmounted, ref, render } from "vue";
import { useRouter, useRoute } from "vue-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import TextLoop from "@/components/braker/TextLoop.vue";
import fakedata from "@/assets/data-cards/fakedata.json";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

defineProps({});

const router = useRouter();
const route = useRoute();

let works = ref(fakedata);

console.log("works: ", works);

const carousel = ref(null);
const currentIndex = ref(0);

const itemWidth = ref(0);
const containerWidth = ref(0);
let startX;

// Functions to update carousel position and apply fade effect
function updateCarousel() {
  const maxIndex = works.value.length - 1;
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
onMounted(() => {
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



  gsap.from(".workSection-item-show-anim", {
      scrollTrigger: {
        trigger: ".workSection-item-show-anim",
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
    <div class="title workSection-item-show-anim">what can i do...</div>
    <div class="carousel-container">
      <button
        :class="['arrow', 'arrow-left', { disabled: currentIndex === 0 }]"
        @click="moveCarousel(-1)"
      >
        ❮
      </button>

      <div class="carousel" ref="carousel">
        <div
          v-for="(work, index) in works"
          :key="index"
          :class="['carousel-item', { active: index === currentIndex }]"
        >
          <img :src="work.image_url" alt="" />

          <div class="item-title">
            {{ work.company_name }}
          </div>
        </div>
      </div>

      <button
        :class="[
          'arrow',
          'arrow-right',
          { disabled: currentIndex === works.length - 1 },
        ]"
        @click="moveCarousel(1)"
      >
        ❯
      </button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-color: var(--color-background);
  color: var(--vt-c-white-soft);
  min-height: 100vh;
  width: 100vw;
  align-items: center;
  display: flex;
  flex-direction: column;
    padding-top: 50px;
  gap: 50px;
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
  min-width: 60vw;
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
.item-title {
  z-index: 3;
  font-size: 30px;
  color: var(--vt-c-black);
  position: absolute;
  bottom: -80px;
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
</style>

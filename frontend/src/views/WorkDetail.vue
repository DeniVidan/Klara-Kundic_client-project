<script setup>
import { onMounted, onUnmounted, ref, render, toRefs, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCurrentUser, useFirebaseAuth } from "vuefire";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { fakedata } from "@/store/store.js";
import CallToAction from "@/components/braker/CallToAction.vue";
import FooterSection from "@/components/SECTIONS/FooterSection.vue";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

const props = defineProps({
  id: String,
});
const router = useRouter();
const route = useRoute();
const auth = useFirebaseAuth();

let works = ref(fakedata);
let work = ref();
work.value = works.value.find((element) => element.id == props.id);

//console.log("works: ", works);

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
  itemWidth.value = carousel.value.querySelector(".carousel-item").offsetWidth; // include gap here
  containerWidth.value = document.querySelector(
    ".carousel-container"
  ).offsetWidth;

  // Initial update
  updateCarousel();

  // Add drag event listeners
  carousel.value.addEventListener("mousedown", startDrag);
  carousel.value.addEventListener("touchstart", startDrag);

  console.log(work.value);
});

onUnmounted(() => {});
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
          v-for="(work, index) in works"
          :key="index"
          :class="['carousel-item', { active: index === currentIndex }]"
        >
          <img :src="work.image_url" alt="" />
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
    <div class="text-content-wrapper">
      <div class="main-content-wrapper">
        <div class="item-title">
        {{ work.company_name }}
      </div>
      <div class="content">
        {{ work.content }}
      </div>
      </div>

      <div class="about-work">
        <div class="title-2">about this work</div>
        <div class="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          excepturi enim, veniam beatae quisquam consequatur porro reprehenderit
          mollitia iure tempora provident sit corrupti quos soluta dolorem quam
          nemo amet ullam!
        </div>
      </div>
      <CallToAction style="margin-top: 50px;" />
      <FooterSection style="margin-top: 100px;" />
    </div>
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
</style>

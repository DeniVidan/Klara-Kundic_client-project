<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import {fakedata} from "@/store/store.js";
import { gsap } from "gsap";

let works = ref(fakedata);
const carousel = ref(null);
const currentIndex = ref(0);

const itemWidth = ref(0);
const containerWidth = ref(0);
let startX;

const progress = computed(() => currentIndex.value + 1);
const progressBarWidth = computed(() => (progress.value / works.value.length) * 100);

function updateCarousel() {
  const maxIndex = works.value.length - 1;
  currentIndex.value = Math.max(0, Math.min(currentIndex.value, maxIndex));

  const translateX =
    -currentIndex.value * itemWidth.value +
    (containerWidth.value - itemWidth.value) / 2;
  carousel.value.style.transform = `translateX(${translateX}px)`;
}

// Animate text overlay on carousel change
const textOverlay = ref(null);
watch(currentIndex, () => {
  gsap.to(textOverlay.value, { opacity: 0, duration: 0.3, onComplete: () => {
    textOverlay.value.innerText = works.value[currentIndex.value].company_name;
    gsap.to(textOverlay.value, { opacity: 1, duration: 0.2 });
  } });
});

function moveCarousel(direction) {
  currentIndex.value += direction;
  updateCarousel();
}

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
  // Initial setup for item and container width
  itemWidth.value = carousel.value.querySelector(".carousel-item").offsetWidth + 20;
  containerWidth.value = document.querySelector(".carousel-container").offsetWidth;

  updateCarousel();

  // Initial fade-in for the first title
  textOverlay.value.innerText = works.value[currentIndex.value].company_name;
  gsap.fromTo(textOverlay.value, { opacity: 0 }, { opacity: 1, duration: 0.3 });

  // Event listeners for dragging functionality
  carousel.value.addEventListener("mousedown", startDrag);
  carousel.value.addEventListener("touchstart", startDrag);
});

onUnmounted(() => {
  //with this cant route back
/*   carousel.value.removeEventListener("mousedown", startDrag);
  carousel.value.removeEventListener("touchstart", startDrag); */
});
</script>


<template>
  <div class="wrapper">
    <div class="title">my work</div>
    <div class="progress-wrapper">
      <div class="progress">{{ progress + "/" + works.length }}</div>
      <div class="progress-container">
        <div class="progress-bar" :style="{ width: progressBarWidth + '%' }"></div>
      </div>
    </div>
    <div class="carousel-container">
      <button
        :class="['arrow', 'arrow-left', { disabled: currentIndex === 0 }]"
        @click="moveCarousel(-1)"
      >
        ❮
      </button>
      <div class="carousel" ref="carousel">
        
        <div v-for="(work, index) in works" :key="index" :class="['carousel-item', { active: index === currentIndex }]">
          <RouterLink :to="{ name: 'workdetail', params: { id: work.id } }">
            <img :src="work.image_url" alt="" />
          </RouterLink>
          

        </div>
      </div>
      <button
        :class="['arrow', 'arrow-right', { disabled: currentIndex === works.length - 1 }]"
        @click="moveCarousel(1)"
      >
        ❯
      </button>
    </div>

    <!-- Fixed Text Overlay -->
    <div class="centered-text">
      <div ref="textOverlay" class="item-title">{{ works[currentIndex]?.company_name }}</div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  background-color: var(--color-background);
  color: var(--vt-c-white-soft);
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 50px;
}
a {
  width: 100%;
  height: 100%;
  padding: 0;
  text-decoration: none;
  box-shadow: none;
}
.active .item-title {
  color: red;
}
.title {
  font-family: sectionTitleFont;
  font-size: 20px;
  color: var(--vt-c-black);
  padding-top: 20px;
  padding-left: 30px;
}
.progress-wrapper {
  display: flex;
  gap: 10px;
  justify-content: end;
  margin-right: 10px;
}
.progress-container {
  width: 70px;
  height: 3px;
  background-color: #b3b3b3;
  border-radius: 4px;
  margin: 10px 0;
  display: flex;
}

.progress-bar {
  height: 100%;
  background-color: var(--vt-c-black);
  transition: width 0.3s ease;
}

.progress {
  color: black;
}

.carousel-container {
  position: relative;
  width: 100vw;
  display: flex;
  align-items: center;
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
  opacity: 0.5;
}

.carousel-item.active {
  opacity: 1;
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
  position: relative;
  bottom: -80px;
  opacity: 0;
  transform: scale(0.8);
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
.centered-text {
  z-index: 1;
  font-size: 30px;
  color: var(--vt-c-black);
  text-align: center;
}
.item-title {
  transition: opacity 0.2s ease;
}
</style>

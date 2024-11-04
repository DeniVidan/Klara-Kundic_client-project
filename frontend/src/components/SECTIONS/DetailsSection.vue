<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

defineProps({});

onMounted(() => {});
</script>

<template>
  <div class="wrapper">
    <div class="title">attention to detail</div>
    <div class="items-wrapper">
      <div class="item">
        <div class="item-image">
          <img src="@/assets/images/detail1.png" alt="" />
        </div>
        <div class="item-title">
          <ul>
            <li>premium pakiranje</li>
          </ul>
        </div>
      </div>
      <div class="item">
        <div class="item-image">
          <img src="@/assets/images/detail2.png" alt="" />
        </div>
        <div class="item-title">
          <ul>
            <li>brza dostava</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
ul {
    padding: 0;
}
.wrapper {
  background-color: var(--color-background);
  color: var(--vt-c-white-soft);
  min-height: 35vh;
  width: 100vw;
  align-items: center;
  display: flex;
  justify-content: start;
  flex-direction: column;
  gap: 50px;
}
.title {
  font-family: sectionTitleFont;
  font-size: 60px;
  color: var(--vt-c-black);
}
.items-wrapper {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
.item-title {
  text-align: start;
  color: var(--vt-c-black);
}
.item-image {
  display: flex;
  justify-content: center;
}

@media (min-width: 1024px) {
}
</style>

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
    <div class="title">what i offer</div>
  </div>
</template>

<style scoped>
.wrapper {
  background-color: var(--color-background);
  color: var(--vt-c-white-soft);
  height: 100vh;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 50px;
}
.title {
  font-family: sectionTitleFont;
  font-size: 60px;
  color: var(--vt-c-black);
  margin-left: 30px;
}

@media (min-width: 1024px) {
}
</style>

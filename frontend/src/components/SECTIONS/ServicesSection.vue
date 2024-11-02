<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

defineProps({
  msg: {
    type: String,
    required: true,
  },
});

onMounted(() => {

});
</script>

<template>
  <div class="wrapper">
    123123123
  </div>
</template>

<style scoped>
.wrapper {
  color: var(--vt-c-white-soft);
  height: 100vh;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 50px;
}


@media (min-width: 1024px) {
}
</style>

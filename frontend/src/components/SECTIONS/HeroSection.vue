<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

defineProps({});

onMounted(() => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".brand-name",
      start: "top top", //top+100
      end: "max",
      pin: true,
      pinSpacing: false,
      /* markers: true, */
      scrub: 1,
    },
  });

  tl.to(".brand-name", {
    scale: 0.6,
    xPercent: -35,
    delay: -2,
    duration: 0.5,
    zIndex: 1000,
  });
  let sections = gsap.utils.toArray(".anim");

  gsap.from(sections, {
    opacity: 0,
    y: 100,
    stagger: 0.15,
  });
});
</script>

<template>
  <div class="wrapper">
    <div class="brand-name anim">Klara Kundic</div>
    <div class="text anim">Live wedding sketching, gifts, custom orders</div>
    <div
      class="anim"
      style="padding: 10px 50px; border: 2px solid var(--vt-c-white-soft)"
    >
      <a href="#proba" class="button">Let's talk</a>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "Times New Roman", serif;
}
.wrapper {
  color: var(--vt-c-white-soft);
  height: 100vh;
  width: 100vw;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 50px;
}
.brand-name {
  font-family: heroHandwrittenFont;
  font-size: 55px;
  cursor: pointer;
  color: var(--vt-c-white-soft);

  z-index: 0;
  mix-blend-mode: difference;
}
.text {
  text-align: center;
}
.button {
  text-decoration: none;
  color: white;
}

@media (min-width: 1024px) {
}
</style>

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


onMounted(()=> {
  gsap.from(".braker-text-anim", {
    scrollTrigger: {
      trigger: ".braker-text-anim",
      start: "center bottom",
      //markers: true,
      toggleActions: "play play pause reverse",
    },
    scale: 1.2,
    opacity: 0,
  })
})


</script>

<template>
  <div class="text braker-text-anim">
    {{msg}}
  </div>
</template>

<style scoped>
.text {
  z-index: 3;
  padding: 100px 20px;
  color: var(--vt-c-white-soft);
  line-height: 2;
  text-align: center;
}
@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
  .text {
    width: 40%;
    margin: auto;
  }
}
</style>

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
  gsap.from(".braker-text-anim", {
    scrollTrigger: {
      trigger: ".braker-text-anim",
      start: "center bottom",
      //markers: true,
      toggleActions: "play play pause reverse",
    },
    scale: 1.2,
    opacity: 0,
  });
});
</script>

<template>
  <div class="wrap">
    <div class="title">create history</div>
    <div class="text">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil sequi qui
      sint aliquid culpa facere mollitia accusamus iusto beatae in?
    </div>
    <RouterLink :to="{ name: 'contact' }" class="button">LET'S TALK</RouterLink>
  </div>
</template>

<style scoped>
.wrap {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.title {
    font-family: sectionTitleFont;
  font-size: 40px;
  color: var(--vt-c-black);
  text-align: center
}
.text {
    color: black;
    padding: 0px 30px;
    text-align: center;
}
.button {
    width: 200px;
    margin: auto;
    padding: 15px 30px;
    background-color: transparent;
    color: black;
    border: 2px solid var(--beige-detail-color);
    text-align: center;
}
@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

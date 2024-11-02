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
  /*   ScrollTrigger.create({
    trigger: ".brand-name",
    start: "top top", //top+100
    end: "max",
    pin: true,
    pinSpacing: false,
    markers: true,
  }); */
});
</script>

<template>
  <div class="wrapper">
    <div class="shape"></div>
    <div class="first-part">
      <div class="title">I'm Klara</div>
      <div class="about-image">
        <img src="@/assets/images/klara-image.jpg" alt="" />
      </div>
    </div>

    <div class="second-part">
      <div class="quotation-mark-1"><img src="@/assets/images/quote1.png" alt=""></div>
      <div class="quotation-mark-2"><img src="@/assets/images/quote2.png" alt=""></div>
      <p>
        Vašu ljubavnu priču pretvaram u umjetnost, potez po potez. Bilo da se
        radi o uživoskicama na dan vjenčanja ili personaliziranim slikama koje
        odražavaju vašu jedinstvenu povezanost, stvaram bezvremenska djela koja
        pričaju vašu priču.
      </p>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  color: var(--vt-c-white-soft);
  min-height: 100vh;
  width: 100%;
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
  gap: 500px;
}
.shape {
  width: 200%;
  height: 40vh;
  background-color: #bdae9a;
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;
  position: absolute;
  left: -50%;
  z-index: 0;
}
.first-part {
  display: flex;
  flex-direction: column;
  gap: 50px;
  position: relative;
  padding-top: 150px;
}
.second-part {
    position: relative;
    top: 0
}
.title {
  font-family: sectionTitleFont;
  font-size: 60px;
  color: var(--vt-c-black);
  margin-left: 30px;
}
.about-image {
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;
}
.about-image img {
  width: 80%;
  position: absolute;
}
.second-part p{
    display: flex;
    align-items: center;
    height: 80vh;
    margin: 0px 20px;
    font-size: 26px;
    line-height: 1.3;
    color: var(--vt-c-black);
}
.quotation-mark-1 {
    position: absolute;
    top: 70px;
    left: -100px;
}
.quotation-mark-2 {
    position: absolute;
    bottom: 90px;
    right: -100px;
}
@media (min-width: 1024px) {
}
</style>

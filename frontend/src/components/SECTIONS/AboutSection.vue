<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

defineProps({});

onMounted(() => {
  let sections = gsap.utils.toArray(".item-in-anim");
  let quotation_marks = gsap.utils.toArray(".quotation-mark-1, .quotation-mark-2")
  quotation_marks.forEach(quote => {
    gsap.from(quote, {
      scrollTrigger: {
        trigger: quote,
        //markers: true,
        start: "center bottom",
        toggleActions: "play play pause reverse",
      },
      opacity: 0,
      y: 100,
      stagger: 0.2,
    });
  });




  sections.forEach((section, index) => {

    gsap.from(section.childNodes, {
      scrollTrigger: {
        trigger: section,
        //markers: true,
        start: "center bottom",
        toggleActions: "play play pause reverse",
      },
      opacity: 0,
      y: 100,
      stagger: 0.2,
    });
  });
});
</script>

<template>
  <div class="wrapper">
    <div class="shape"></div>
    <div class="first-part item-in-anim">
      <div class="title">I'm Klara</div>
      <div class="about-image">
        <img src="@/assets/images/klara-image.jpg" alt="" />
      </div>
    </div>

    <div class="second-part">
      <div class="quotation-mark-1">
        <img src="@/assets/images/quote1.png" alt="" />
      </div>
      <div class="quotation-mark-2">
        <img src="@/assets/images/quote2.png" alt="" />
      </div>

      <p class="item-in-anim">
        <span>
          <strong>Vašu ljubavnu priču</strong> pretvaram u umjetnost, potez po
          potez. <br /> <br>
          <strong>Skicama uživo na dan vjenčanja</strong> stvaram bezvremenska djela
          koja pričaju vašu priču.
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "Times New Roman", serif;
}
strong {
  font-weight: bold;
  color: var(--beige-detail-color);
}
.wrapper {
  color: var(--vt-c-white-soft);
  min-height: 100vh;
  width: 100%;
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
  gap: 400px;
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
  top: 0;
}
.title {
  font-family: sectionTitleFont;
  font-size: 60px;
  color: var(--vt-c-black);
  margin-left: 45px;
}
.about-image {
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;
}
.about-image img {
  width: 350px;
  position: absolute;
}
.second-part p {
  display: flex;
  align-items: center;
  height: 80vh;
  margin: 0px 20px;
  font-size: 1.5rem;
  line-height: 1.3;
  color: var(--vt-c-black);
}

.quotation-mark-1 {
  position: absolute;
  top: 10px;
  left: -100px;
}
.quotation-mark-2 {
  position: absolute;
  bottom: 10px;
  right: -100px;
}
@media (min-width: 1024px) {
}
</style>

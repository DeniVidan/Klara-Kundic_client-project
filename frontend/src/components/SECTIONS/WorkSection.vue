<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);
defineProps({});

let services = [
  {
    name: "service1",
    image: "src/assets/images/service1.jpg",
    alt: "image",
  },
  {
    name: "service2",
    image: "src/assets/images/service2.jpg",
    alt: "image",
  },
  /*     {
      name: "service3",
      image: "@/assets/images/",
      alt: "image"
    }, */
];

onMounted(() => {

  let carouselItems = gsap.utils.toArray(".services-wrapper")
  //console.log(carouselItems)

  Draggable.create(".card-wrap", {
    type: "x",
    bounds: ".carousel",
  })


/* 
    gsap.to(".services-wrapper", {
      x: -300,
      delay: 1,
      scrollTrigger: {
        trigger: ".carousel",
        pin:true,
        pinSpacing: false,
        scrub: 1,
        start: "top top",
        end: "center bottom",
        toggleActions: "play complete reverse reset",
        markers: true
      }
    })
 */


});
</script>

<template>
  <div class="wrapper">
    <div class="title">what i do</div>
    <div class="carousel">
      <div class="card-wrap">
      <div
        v-for="service in services"
        :key="service.image"
        class="services-wrapper"
      >
        <img v-bind:src="service.image" class="image" alt="" />
        <div class="text">asdasd</div>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-color: var(--color-background);
  color: var(--vt-c-white-soft);
  min-height: 80vh;
  width: 100vw;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 50px;
}
.title {
  font-family: sectionTitleFont;
  font-size: 60px;
  color: var(--vt-c-black);

}
.card-wrap {
  display: flex;
  gap: 10px;
  width: inherit;
}
.carousel {
  --container-width: 147%;
  margin-top: 150px;
  position: absolute;
  left: 10px;
  width: var(--container-width);
}
.services-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.text {
    color: var(--vt-c-black);
  width: 100%;
  text-align: center;
}
.image {
  
  width: 350px;
  height: 400px;
  object-fit: cover;
  border-radius: 6%;
}

@media (min-width: 1024px) {
}
</style>

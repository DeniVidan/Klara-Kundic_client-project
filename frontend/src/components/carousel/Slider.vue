<script setup>
import { onMounted, onUnmounted, ref, render } from "vue";
import { useRouter, useRoute } from "vue-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import TextLoop from "@/components/braker/TextLoop.vue";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

defineProps({});

const router = useRouter();
const route = useRoute();

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
];



onMounted(() => {



  let cards = gsap.utils.toArray(".card-wrapper");

  let wrapper = document.getElementsByClassName("card-wrapper");

  console.log(wrapper[0].offsetWidth);

  let a = Draggable.create(".card-wrapper", {
    type: "x",
    throwProps: true,
    trigger: ".card-wrapper-test",
    bounds: 10000,
    onDrag: (self) => console.log(self.progress)
  });
});

onUnmounted(() => {});
</script>
<template>
  <div class="wrapper">
    <div class="card-wrapper-test">
      <div class="card-wrapper">
        <div v-for="service in services" :key="service.name" class="card">
          <div class="title">{{ service.name }}</div>
          <img :src="service.image" alt="" />
        </div>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
* {
  --card-width: 350px;
  --screen-size: 390px;
  --cards-cont-size: 600px;
  --move-size: calc(var(--cards-cont-size) - var(--screen-size));
  
}
.wrapper {
  display: flex;
width: 100vw;
overflow-x: hidden;

}
.card-wrapper-test {
  
  width: var(--move-size);
}
.card-wrapper {

  display: flex;
  flex-direction: row;
  width: 100%;
}
.card img {
  width: 300px;
  object-fit: cover;
  height: 400px;
}

</style>

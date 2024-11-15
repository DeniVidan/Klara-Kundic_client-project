<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);
defineProps({});


onMounted(() => {

});
</script>

<template>
  <div class="wrapper-footer">
    <div class="title">Klara Kundich</div>
    <div class="content">
        <div class="item">
            <div class="item-title">Copyright</div>
            <div class="item-text">All Rights Reserved 2024</div>
        </div>
        <div class="item">
            <div class="item-title">Social media</div>
            <div class="item-text">IG ~ FB ~ IN</div>
        </div>
        <div class="item">
            <div class="item-title">Designed by</div>
            <div class="item-text">Deni Vidan</div>
        </div>
    </div>
    <div class="bottom-text">let's work</div>

  </div>
</template>

<style scoped>
.wrapper-footer {
  color: var(--vt-c-white-soft);
  background-color: var(--beige-detail-color);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
}
.title {
  font-family: sectionTitleFont;
  font-size: 120px;
  line-height: 0.9;
  color: var(--vt-c-black);
  text-align: center;
  
}
.content {
    display: flex;
    flex-direction: column;
    gap: 30px;
    font-size: 20px;
    margin-left: 30px;
}
.item-title {
    color: rgba(0, 0, 0, 0.37);
}
.item-text {

}
.bottom-text {
    font-family: sectionTitleFont;
  font-size: 100px;
  line-height: 0.9;
  color: var(--vt-c-black);
  text-align: center;
}





@media (min-width: 1024px) {
}
</style>

<script setup>
import { onMounted, onUnmounted, ref, render } from "vue";
import { useRouter, useRoute } from "vue-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import ContactSectionFull from "@/components/SECTIONS/ContactSectionFull.vue";
import FooterSection from "@/components/SECTIONS/FooterSection.vue";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

defineProps({});

const router = useRouter();
const route = useRoute();

onMounted(() => {});

onUnmounted(() => {});
</script>
<template>
  <div class="wrapper">
    <div class="main" style="display: flex; flex-direction: column;">
    <img src="@/assets/images/background-gif.gif" class="bg-img" alt="" />
    <div class="title">contact me</div>
    
      <ContactSectionFull />

    </div>
    <FooterSection style="margin-top: 0vh; position: relative" />
     
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100vw;
  /* background-color: var(--color-background); */
}
.bg-img {
  position: fixed;
  width: 175%;
  z-index: -1;
  left: 0;
  top: 0;
  filter: brightness(0.4);
}

.title {
  font-family: sectionTitleFont;
  font-size: 20px;
  color: var(--vt-c-white-soft);
  padding-top: 20px;
  padding-left: 30px;
}
</style>

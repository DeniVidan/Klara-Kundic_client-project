<script setup>
import { onMounted, onUnmounted, ref, render } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCurrentUser, useFirebaseAuth } from "vuefire";
import HeroSection from "../components/SECTIONS/HeroSection.vue";
import AboutSection from "@/components/SECTIONS/AboutSection.vue";
import ServicesSection from "@/components/SECTIONS/ServicesSection.vue";

defineProps({});

const router = useRouter();
const route = useRoute();
const auth = useFirebaseAuth();

/* console.log(auth.currentUser) */

onMounted(() => {});

onUnmounted(() => {});
</script>
<template>
  <div class="wrapper">
    <img src="@/assets/images/background-gif.gif" class="bg-img" alt="" />
    <HeroSection style="position: relative; z-index: 2;"/>
    <AboutSection style="position: relative; z-index: 1;"/>
    <ServicesSection style="position: relative;"/>
    <div
      style="
        position: relative;
        width: 100vw;
        height: 100vh;
        background-color: blue;
      "
    ></div>
  </div>
</template>

<style scoped>
.bg-img {
  position: fixed;
  width: 175%;
  z-index: 0;
  left: 0;
  top: 0;
  filter: brightness(0.4);
}

@font-face {
  font-family: Glamora;
  src: url(../assets/fonts/GLAMORA.otf) format("truetype");
}
@font-face {
  font-family: Sinera;
  src: url(../assets/fonts/Sinera.ttf) format("truetype");
}
@font-face {
  font-family: Pavon;
  src: url(../assets/fonts/Pavon.otf) format("truetype");
}
@font-face {
  font-family: ExcaliburNouveau;
  src: url(../assets/fonts/Excalibur_Nouveau.ttf) format("truetype");
}
@font-face {
  font-family: RCDemo;
  src: url(../assets/fonts/R&C-Demo.otf) format("truetype");
}
@font-face {
  font-family: LazySketch;
  src: url(../assets/fonts/Lazy_Sketch.ttf) format("truetype");
}
@font-face {
  font-family: MonasDemo;
  src: url(../assets/fonts/Monas_Demo.ttf) format("truetype");
}
@font-face {
  font-family: moniqua;
  src: url(../assets/fonts/Variable-TT/font1.ttf) format("truetype");
}
@font-face {
  font-family: moniqua2;
  src: url(../assets/fonts/OpenType/Moniqa-ExtraBoldDisplay.ttf)
    format("truetype");
}
@font-face {
  font-family: moniquaItalic;
  src: url(../assets/fonts/OpenType/Moniqa-NarrowItalicDisplay.ttf)
    format("truetype");
}
@font-face {
  font-family: buttonFont;
  src: url(../assets/fonts/OpenType/Moniqa-BlackHeading.ttf) format("truetype");
}
@font-face {
  font-family: regularMoniqua;
  src: url(../assets/fonts/OpenType/Moniqa-MediumItalicParagraph.ttf)
    format("truetype");
}
@font-face {
  font-family: moniquaCardTitle;
  src: url(../assets/fonts/OpenType/Moniqa-BlackCondParagraph.ttf)
    format("truetype");
}
</style>

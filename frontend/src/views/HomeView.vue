<script setup>
import { onMounted, onUnmounted, ref, render } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCurrentUser, useFirebaseAuth } from "vuefire";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import HeroSection from "../components/SECTIONS/HeroSection.vue";
import AboutSection from "@/components/SECTIONS/AboutSection.vue";
import ServicesSection from "@/components/SECTIONS/ServicesSection.vue";
import DetailsSection from "@/components/SECTIONS/DetailsSection.vue";
import WorkSection from "@/components/SECTIONS/WorkSection.vue";
import PageBreak from "@/components/braker/PageBreak.vue";
import landingText from "@/assets/data-cards/landingText.json";
import ContactSection from "@/components/SECTIONS/ContactSection.vue";
import FooterSection from "@/components/SECTIONS/FooterSection.vue";
import Carousel1 from "@/components/carousel/Carousel1.vue";
import Carousel2 from "@/components/carousel/Carousel2.vue";
import { userData } from "@/store/store";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

defineProps({});

const router = useRouter();
const route = useRoute();
const auth = useFirebaseAuth();

/* console.log(auth.currentUser) */

onMounted(() => {


});

onUnmounted(() => {});
</script>
<template>
  <div class="wrapper">
    <img src="@/assets/images/background-gif.gif" class="bg-img" alt="" />
    <HeroSection style="position: relative; z-index: 2" />
    <AboutSection style="position: relative; z-index: 1" />
    <!-- <ServicesSection style="position: relative; z-index: 1" /> -->
     <Carousel1 style="position: relative; z-index: 1"/>
    <DetailsSection style="position: relative; z-index: 1" />
    <PageBreak
      :msg="landingText[0].text"
      style="position: relative; z-index: 1"
    />
    <!-- WorkSection style="position: relative; z-index: 1" /> -->
    <Carousel2 style="position: relative; z-index: 1"/>
    <ContactSection id="proba" style="position: relative; z-index: 1" />
    <FooterSection class="footer" style="position: relative" />
  </div>
</template>

<style scoped>
.bg-img {
  position: fixed;
  width: 175%;
  z-index: -1;
  left: 0;
  top: 0;
  filter: brightness(0.4);
}
</style>

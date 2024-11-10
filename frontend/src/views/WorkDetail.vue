<script setup>
import { onMounted, onUnmounted, ref, render, toRefs, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCurrentUser, useFirebaseAuth } from "vuefire";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

const props = defineProps({
  work: Object,
})

const router = useRouter();
const route = useRoute();
const auth = useFirebaseAuth();

const { work } = toRefs(props)

onMounted(() => { 
    console.log(props)
});

onUnmounted(() => {});
</script>
<template>
  <div class="wrapper">
    dada{{ work }}
  </div>
</template>

<style scoped>

</style>

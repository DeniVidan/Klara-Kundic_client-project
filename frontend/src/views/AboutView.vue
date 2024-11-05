<script setup>
import { onMounted, onUnmounted, ref, render } from "vue";
import { useRouter, useRoute } from "vue-router";

defineProps({});

const router = useRouter();
const route = useRoute();

onMounted(() => {});

onUnmounted(() => {});
</script>
<template>
  <div class="wrapper">
    <div class="main-title">about me</div>
    <div class="hero-text">
      Hi,<br> I’m Klara <span><img src="@/assets/images/klara-image.jpg" width="40px" height="40px" alt="" style="object-fit: cover; border: 3px solid var(--beige-detail-color); border-radius: 5px;"></span> Kundich. an independent live wedding sketcher located in
      croatia.
    </div>
  </div>
</template>

<style scoped>
.main-title {
  font-family: sectionTitleFont;
  font-size: 20px;
  color: var(--vt-c-black);
  padding-top: 20px;
  padding-left: 30px;
}
.hero-text {
  font-family: sectionTitleFont;
  font-size: 38px;
  color: var(--vt-c-black);
  text-align: center;
  padding: 50px 0px;
  line-height: 1.3;
}
</style>

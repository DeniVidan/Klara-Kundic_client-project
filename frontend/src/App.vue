<script setup>
import Navbar from "./components/Navbar.vue";
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Service, Auth } from "../services/service";

const router = useRouter();
const route = useRoute();

onMounted(() => {});
</script>



<template>
  <div class="wrapper">
    <Navbar />
    <main>
      <RouterView />
    </main>
  </div>
</template>



<style scoped>
.wrapper {
  display: flex;
  width: 100vw !important;
  flex-direction: column;
  overflow-x: hidden;
}

@media (min-width: 1024px) {
}
</style>

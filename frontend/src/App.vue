<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
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
    <Navbar style="z-index: 1;" />
    <main>
      <RouterView style="z-index: 0;" />
    </main>
  </div>
</template>



<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}

@media (min-width: 1024px) {
}
</style>

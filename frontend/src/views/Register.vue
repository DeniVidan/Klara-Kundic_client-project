<script setup>
import { onMounted, onUnmounted, ref, render } from "vue";
import { useRouter, useRoute } from "vue-router";
import {Service, Auth} from '../../services/service'

defineProps({});

const router = useRouter();
const route = useRoute();


const username = defineModel("username", { required: true })
const password = defineModel("password", { required: true})


function login() {
    console.log(username.value, password.value)
    Auth.register(username.value, password.value)
}


onMounted(() => {});

onUnmounted(() => {});
</script>
<template>
  <div class="wrapper">
    REGISTER
    <div class="login-wrapper">
      <div class="login-card">
        <input v-model="username" type="text" />
        <input v-model="password" type="password" />
        <button @click="login()">LOGIN</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-card {
    display: flex;
    flex-direction: column;
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

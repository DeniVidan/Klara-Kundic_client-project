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
  <div class="wrapper">
    <img src="@/assets/images/background-gif.gif" class="bg-img" alt="" />
    <div class="title">contact me</div>
    <div class="form-wraper">
      <div class="form">
        <div class="name">
          <div class="firstname"><input placeholder="Firstname" type="text" /></div>
          <div class="lastname"><input placeholder="Lastname" type="text" /></div>
        </div>
        <div class="email"><input placeholder="E-mail" type="text" /></div>
        <div class="message"><textarea placeholder="Message" rows="10"></textarea></div>
        <div class="button">SEND</div>
        <div class="hero-text"><h1>Let me paint your canvas</h1></div>
      </div>
    </div>
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
.wrapper {
  color: var(--vt-c-white-soft);
  height: 100vh;
  width: 100vw;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 50px;
  justify-content: center;
}
.title {
  font-family: sectionTitleFont;
  font-size: 60px;
  color: var(--vt-c-white-soft);
}
.form-wraper {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 350px;
}
.name {
  display: flex;
  flex-direction: row;
  justify-content: center;
  
}
.firstname, .lastname, .email {
    display: flex;
    justify-content: center;
    height: 50px;
    position: relative;
}
.firstname, .lastname {
    width: 175px;
}

.message {
    display: flex;
    justify-content: center;
    position: relative;
}
input {
    height: 100%;
    max-width: 100%;
    min-width: 100%;
    background-color: rgba(255, 255, 255, 0.486);
    backdrop-filter: blur(10px);
    border: none;
    color: rgb(255, 255, 255);
    padding-top: 0px;
    
}

textarea {
    resize: none;
    max-width: 100%;
    min-width: 100%;
    background-color: rgba(255, 255, 255, 0.486);
    backdrop-filter: blur(2px);
    border: none;
    padding: 10px 0;
    color: rgb(255, 255, 255);
    padding-top: 10px;
    
}

input::placeholder, textarea::placeholder {
    color: var(--vt-c-white-soft);
    font-family:Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    align-self: end;
    /* padding-left: 10px; */
    /* font-size: 17px; */
    position: absolute;
    bottom: 5px;
    left: 10px
}

input:focus, textarea:focus {
    outline: none;
    backdrop-filter: blur(20px);
    transition: all 200ms ease-out;
}
input:focus::placeholder {
    bottom: 30px;
    transition: all 100ms ease-out;
}
textarea:focus::placeholder {
    bottom: 30px;
    transition: all 100ms ease-out;
}

.button {    
    color: var(--vt-c-black);
    font-size: 20px;
    width: 110px;
    background-color: white;
    padding: 7px 20px;
    border-radius: 40px;
    text-align: center;
    margin: auto;
    margin-top: 25px;
}

.hero-text {
    font-size: 45px;
    line-height: 1;
    text-align: center;
    font-family: sectionContactFont;
}





@media (min-width: 1024px) {
}
</style>

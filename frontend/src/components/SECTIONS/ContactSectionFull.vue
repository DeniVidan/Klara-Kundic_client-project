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
    <!-- <div class="text-divider">Get in contact with me by filling out the form or use another way to contact me below</div> -->
    
    <div class="form-wraper">
      <div class="big-text">let's talk!</div>
      <div class="form">
        <div class="name">
          <div class="firstname"><input placeholder="Firstname" type="text" /></div>
          <div class="lastname"><input placeholder="Lastname" type="text" /></div>
        </div>
        <div class="email"><input placeholder="E-mail" type="text" /></div>
        <div class="message"><textarea placeholder="Message" rows="10"></textarea></div>
        <div class="button">SEND</div>
        <!--  -->
      </div>
    </div>
    <!-- <div class="text-divider">Make it memorable.</div> -->
    <div class="additional-contact">
      <div class="title">additional contact</div>
      <div class="contacts">
        <div class="email-contact"><span><img src="@/assets/images/email-icon.png" alt=""></span>kk@gmail.com</div>
        <div class="phone-contact"><span><img src="@/assets/images/telephone-icon.png" alt=""></span>+38598123456</div>
      </div>
    </div>
    <div class="hero-text"><h1>Let me paint your canvas</h1></div>
    
  </div>
</template>

<style scoped>

.wrapper {
  color: var(--vt-c-white-soft);
  width: 100vw;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 50px;
  justify-content: start;
  margin-top: 50px;
  margin-bottom: 100px;
}
.text-divider {
  text-align: center;
  width: 80%;
  padding: 20px 0px;
}
.title {
  font-family: sectionTitleFont;
  font-size: 40px;
  color: var(--vt-c-black);
  display: flex;
  justify-content: center;
}
.big-text {
  font-family: sectionTitleFont;
  font-size: 60px;
  color: var(--vt-c-white-soft);
  width: 100%;
  text-align: start;

}
.additional-contact {
  background-color: rgba(255, 255, 255, 0.486);
  backdrop-filter: blur(10px);

  padding: 40px 0px;
  display: flex;
    flex-direction: column;
    gap: 20px;
    width: 90%;
    border-radius: 10px;
    
}
.email-contact, .phone-contact{
  display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}
.email-contact span, .phone-contact span {
  display: flex;
}
.email-contact span img, .phone-contact span img{
  width: 20px;
  opacity: 0.7;
}


.contacts {
  color: var(--vt-c-black);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px
}
.form-wraper {
  
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
  gap: 10px
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
    padding: 0;

    
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
    
    align-self: end;
    /* padding-left: 10px; */
    /* font-size: 17px; */
    position: absolute;
    bottom: 5px;
    left: 10px;
    transition: 200ms all ease-out;
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

.hero-text h1 {
    font-size: 100px;
    line-height: 1;
    text-align: center;
    font-family: sectionContactFont;

}





@media (min-width: 1024px) {
}
</style>

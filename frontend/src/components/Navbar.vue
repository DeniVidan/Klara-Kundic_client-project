<script setup>
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const router = useRouter();
const route = useRoute();


onMounted(() => {



    
}) 
function hamburgerClick() {
  const icon = document.querySelector("#hamburgerIcon");
  const navigationLinks = document.querySelector(".links-container.mobile");

  icon.classList.toggle("open");
  navigationLinks.classList.toggle("open");
  gsap.fromTo(
    ".navbar-anim",
    {
      x: -500,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
/*       stagger: {
        amount: 0.08,
        from: "start",
        ease: "power4.out",
      }, */
    }
  );
}

</script>

<template>
  <nav>
    <div class="brand-container">
      <div class="brand-logo"></div>
      <div class="brand-name">denividan@gmail.com</div>
    </div>
    <div class="links-container desktop">
      <ul>
        <a href=""><li>link</li></a>
        <a href=""><li>link</li></a>
        <a href=""><li>link</li></a>
        <a href=""><li>link</li></a>
      </ul>
    </div>

    <a id="hamburgerIcon" @click="hamburgerClick()" class="navbar-hamburger">
      <span aria-hidden="true"></span>
    </a>
    <!-- Navigation for mobile (initially hidden) -->
  </nav>
  <div class="links-container mobile">
    <ul>
      <RouterLink @click="hamburgerClick()" to="/" class="link navbar-anim">
        <div>001</div>
        <div>HOME</div>
      </RouterLink>
      <RouterLink
        @click="hamburgerClick()"
        to="/about"
        class="link navbar-anim"
      >
        <div>002</div>
        <div>ABOUT</div>
      </RouterLink>
      <RouterLink
        @click="hamburgerClick()"
        to="/mywork"
        class="link navbar-anim"
      >
        <div>003</div>
        <div>MY WORK</div>
      </RouterLink>
      <RouterLink
        @click="hamburgerClick()"
        to="/contact"
        class="link navbar-anim"
      >
        <div>004</div>
        <div>CONTACT</div>
      </RouterLink>

    </ul>
  </div>
</template>

<style scoped>
body {
}

* {
  padding: 0;
  margin: 0;
}

header {
  position: absolute;
  max-height: 400px;
  min-height: 60px;
  display: flex;
  align-self: center;
}
nav {
  top: 0;
  left: 0;
  z-index: 1;
  position: fixed;
  height: 60px;
  color: white;
  display: flex;
  width: 100%;
  justify-content: space-around;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(15px);
}
.brand-container {
  display: flex;
  gap: 10px;
}
.brand-name {
  font-size: 13px;
  align-self: center;
  cursor: pointer;
}
.brand-logo {
  align-self: center;
}
.brand-logo > img {
  display: flex;
  cursor: pointer;
}

.links-container {
  align-self: center;
}

ul {
  display: flex;
  gap: 20px;
  list-style-type: none;
}
/* li {
  cursor: pointer;
  color: #adadadff;
}
li:hover {
  cursor: pointer;
  color: #e6e6e6;
} */
ul > a > li {
  position: relative;
}

ul a li::after {
  content: "";
  position: absolute;
  width: 0;
  height: 4px;
  bottom: -7px;
  left: 50%;
  /* Start from the middle */
  transform: translateX(-50%); /* Center the line */
  background-color: #61ff61;
  transition: width 200ms ease-out, left 200ms ease-out;
}

ul a:hover li::after {
  width: 100%;
  /* Move to the left edge */
}

a {
  text-decoration: none;
}

.link {
  display: flex;
  justify-content: space-between;
  font-family: "DM Serif Display";
  font-weight: 400;
  font-style: italic;
  text-transform: lowercase;
}

.navbar-hamburger {
  display: flex;
  cursor: pointer;
  position: relative;
  width: 70px;
  justify-content: center;
}
.navbar-hamburger > span {
  position: absolute;
  width: 35%;
  height: 2px;
  background-color: white;
  top: 50%;
  border-radius: 2px;
}
.navbar-hamburger > span::before {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: white;
  top: -450%;
  left: 0;
  content: "";
  border-radius: 2px;
  transition: transform 0.3s ease-in-out;
}
.navbar-hamburger > span::after {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: white;
  top: 450%;
  left: 0;
  content: "";
  border-radius: 2px;
  transition: transform 0.3s ease-in-out;
}
.navbar-hamburger.open > span {
  transform: rotate(180deg);
  background-color: transparent;
  transition: transform 0.3s ease-in-out;
}
.navbar-hamburger.open > span::before {
  transform: translateY(9px) rotate(45deg);
}
.navbar-hamburger.open > span::after {
  transform: translateY(-9px) rotate(-45deg);
}

.links-container.mobile {
  top: 0;
  left: 0;
  display: flex;
  z-index: 0;
}
.links-container.desktop {
  display: none;
}


@media (max-width: 2025px) {
  .navbar-hamburger {
    display: flex;
  }
  .links-container.mobile {
    background-color: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(15px);
    width: 100%;
    /* transform: translateY(-100px); */
    opacity: 0;
    top: -100vh;
    position: fixed;
    display: flex;
    justify-content: center;
    transition: 300ms ease-out;
    z-index: 1;
  }
  .links-container.mobile > ul {
    display: flex;
    flex-direction: column;
    /* transition: 200ms ease-out; */
  }

  .links-container.mobile.open {
    display: flex;
    top: 0vh;
    height: calc(
      100vh - 60px
    ); /* Adjust the max-height to your content height */
    transform: translateY(60px);
    opacity: 1;
    transition: 0.4s ease-out;
  }
  .links-container.mobile.open > ul {
    align-self: center;
    font-size: 80px;
    font-weight: bolder;
  }
  .links-container.mobile.open > ul > a {
    font-weight: bolder;
    align-self: flex-start;
    gap: 50px;
    width: 100%;
  }

  .links-container.desktop {
    display: none;
  }
  nav {
    justify-content: space-between;
  }
  .brand-container {
    margin-left: 20px;
  }
  .navbar-hamburger {
  }
}



</style>

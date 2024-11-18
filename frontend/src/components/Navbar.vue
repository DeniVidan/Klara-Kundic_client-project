<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCurrentUser, useFirebaseAuth } from "vuefire";
import { signOut } from "firebase/auth";

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();
const route = useRoute();

const auth = useFirebaseAuth();
function goToProfile() {
  router.push({name: "profile"})
}
onMounted(() => {});

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
  <div style="z-index: 6">
    <button v-if="useCurrentUser().value" @click="signOut(auth)">LOGOUT</button>
    <button v-if="useCurrentUser().value" @click="goToProfile">PROFILE</button>
  </div>
  <div class="hamburger-wrapper">
    <a id="hamburgerIcon" @click="hamburgerClick()" class="navbar-hamburger">
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div class="links-container mobile">
    <ul>
      <RouterLink @click="hamburgerClick()" to="/" class="link navbar-anim">
        <div class="nav-item-num">001</div>
        <div>HOME</div>
      </RouterLink>
      <RouterLink
        @click="hamburgerClick()"
        to="/about"
        class="link navbar-anim"
      >
        <div class="nav-item-num">002</div>
        <div>ABOUT</div>
      </RouterLink>
      <RouterLink
        @click="hamburgerClick()"
        to="/mywork"
        class="link navbar-anim"
      >
        <div class="nav-item-num">003</div>
        <div>MY WORK</div>
      </RouterLink>
      <RouterLink
        @click="hamburgerClick()"
        to="/contact"
        class="link navbar-anim"
      >
        <div class="nav-item-num">004</div>
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
.hamburger-wrapper {
  background-color: var(--beige-detail-color);
  display: flex;
  position: fixed;
  border-radius: 100%;
  width: 60px;
  height: 60px;
  z-index: 4;
  right: 15px;
  top: 15px;
}

nav {
  top: 10px;
  left: 10px;
  align-items: center;
  right: 10px;
  z-index: 2;
  position: fixed;
  height: 60px;
  width: 50%;
  display: flex;
  justify-content: space-around;
  background-color: transparent;
  mix-blend-mode: difference;
}
.brand-container {
  display: flex;
  gap: 10px;
}

.brand-name {
  font-family: heroHandwrittenFont;
  font-size: 30px;
  align-self: center;
  cursor: pointer;
  color: white;
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
  list-style-type: none;
}

ul > a > li {
  position: relative;
}

a {
  text-decoration: none;
}
a:hover {
  background-color: var(--beige-detail-color);
  color: var(--color-background) !important;
}
#hamburgerIcon:hover {
  background-color: transparent;

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
  top: -250%;
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
  top: 250%;
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
  transform: translateY(5px) rotate(45deg);
}
.navbar-hamburger.open > span::after {
  transform: translateY(-5px) rotate(-45deg);
}

.links-container.mobile {
  top: 0;
  left: 0;
  display: flex;
}
.links-container.desktop {
  display: none;
}

.nav-item-num {
  font-size: 17px;
}

@media (max-width: 2025px) {
  .navbar-hamburger {
    display: flex;
  }
  .links-container.mobile {
    background-color: var(--color-background);
    backdrop-filter: blur(15px);
    width: 100%;
    /* transform: translateY(-100px); */
    opacity: 0;
    top: -100vh;
    position: fixed;
    display: flex;
    justify-content: center;
    transition: 300ms ease-out;
    z-index: 3;
  }
  .links-container.mobile > ul {
    display: flex;
    flex-direction: column;
    /* transition: 200ms ease-out; */
  }

  .links-container.mobile.open {
    display: flex;
    top: 0vh;
    height: calc(100vh); /* Adjust the max-height to your content height */
    /* transform: translateY(60px); */
    opacity: 1;
    transition: 0.4s ease-out;
    justify-content: end;
    padding-right: 10px;
  }
  .links-container.mobile.open > ul {
    align-self: center;
    font-size: 50px;
    font-weight: bolder;
  }
  .links-container.mobile.open > ul > a {
    font-weight: bolder;
    align-self: flex-start;
    gap: 50px;
    width: 100%;
    color: var(--vt-c-black);
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
@media (min-width: 1024px) {
  .hamburger-wrapper {
    top: 40px;
    right: 40px;
    width: 70px;
    height: 70px;
  }
}
</style>

<script setup>
import FooterSection from "@/components/SECTIONS/FooterSection.vue";
import { onMounted, onUnmounted, ref, render } from "vue";
import { useRouter, useRoute } from "vue-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

defineProps({});

const router = useRouter();
const route = useRoute();

onMounted(() => {
  let sections = gsap.utils.toArray(".additional-section");
  //console.log(sections)

  sections.forEach((section, index) => {
    let array = [];
    array.push(section.childNodes[0]);
    array.push(section.childNodes[1]);
    gsap.from(array, {
      scrollTrigger: {
        trigger: section,
        markers: true,
        start: "center bottom",
        toggleActions: "play play pause reverse",
      },
      opacity: 0,
      y: 100,
      stagger: 0.2,
    });
  });

  let selected_image = undefined;
let images = gsap.utils.toArray(".image img");

images.forEach((image) => {
  image.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent event from propagating to the document

    // If there is already a selected image, remove focus from it
    if (selected_image) {
      selected_image.classList.remove("image-focus");
      selected_image.style.transition = "200ms all";
    }

    // Apply focus to the clicked image
    image.classList.add("image-focus");
    selected_image = image;
  });
});

document.addEventListener("click", () => {
  if (selected_image) {
    selected_image.classList.remove("image-focus");
    selected_image.style.transition = "200ms all";
    selected_image = undefined;
  }
});

  images.forEach((image, index) => {
    gsap.fromTo(
      image,
      {
        y: 100,
        x: () => {
          return 10 * (index - 1);
        },
        opacity: 0,
      },
      {
        y: () => {
          if (index == 0 || index == 2) {
            return 10;
          } else return 0;
        },
        x: () => {
          return 105 * (index - 1);
        },
        rotateZ: () => {
          return 10 * (index - 1);
        },
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        /* delay: 0.5 */
      }
    );
  });

  gsap.from(".hero-text", {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: "power3.out",
  });

  gsap.from(".text-divider", {
    opacity: 0,
    y: 20,
    duration: 0.5,
    delay: 0.5,
    ease: "power3.out",
  });
});

onUnmounted(() => {});
</script>
<template>
  <div class="wrapper">
    <div class="bg-image">
      <img src="@/assets/images/bg-logo.png" alt="" />
    </div>

    <div class="main-title">about me</div>
    <div class="first-section">
      <div class="hero-text">
        Hi,<br />
        I’m Klara Kundich.
        <span><img src="@/assets/images/klara-image.jpg" alt="" /></span>
        an independent live wedding sketcher located in croatia.
      </div>

      <div class="images-section">
        <div class="images-card">
          <div class="image">
            <img src="@/assets/images/klara1.jpg" alt="" />
          </div>
          <div class="image">
            <img src="@/assets/images/klara2.jpg" alt="" />
          </div>
          <div class="image">
            <img src="@/assets/images/klara3.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="text-divider">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium?
    </div>

    <div class="additional-section">
      <div class="title show-anim">where?</div>
      <div class="content show-anim">
        I am located in Croatia so I cover all of Croatia. Not from Croatia? No
        problem, hit me up, lets talk!
      </div>
    </div>
    <div class="additional-section" style="height: 60vh;">
      <div class="title-2 show-anim">more about Klara...</div>
      <div class="content show-anim">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
        excepturi enim, veniam beatae quisquam consequatur porro reprehenderit
        mollitia iure tempora provident sit corrupti quos soluta dolorem quam
        nemo amet ullam!
      </div>
    </div>
    <FooterSection class="footer" style="position: relative" />
  </div>
</template>

<style scoped>
.wrapper {
  overflow-x: hidden;
  width: 100vw;
}
.main-title {
  font-family: sectionTitleFont;
  font-size: 20px;
  color: var(--vt-c-black);
  padding-top: 20px;
  padding-left: 30px;
}
.first-section {
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.hero-text {
  font-family: sectionTitleFont;
  font-size: 38px;
  color: var(--vt-c-black);
  text-align: center;
  padding: 50px 0px;
  line-height: 1.3;
}
span {
  position: relative;
}
span img {
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
}
.image-focus {
  transform: scale(2) !important;
  transition: 200ms all !important;
  z-index: 4 !important;
}
.bg-image {
  position: fixed;
  height: 100vh;
  display: flex;
  align-items: center;
  width: 100vw;
}
.bg-image img {
  width: 100%;
  position: absolute;

}
.images-section {
  overflow-x: hidden;
  height: 160px;
  width: 100vw;
}
.images-card {
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
}
.image-selected {
  transform: scale(2);
}
.image {
  position: absolute;
  width: 120px;
  height: 160px;
}
.image img {
  width: 120px;
  height: 160px;
  object-fit: cover;
  position: absolute;
  z-index: 2;
}
.text-divider {
  text-align: center;
  height: 20vh;
  display: flex;
  align-items: center;
}
.additional-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  min-height: 40vh;
  font-size: 16px;
}
.title {
  font-family: sectionTitleFont;
  font-size: 60px;
  color: var(--vt-c-black);
  margin-left: 45px;
}
.content {
  margin: 0px 45px;
}
.title-2 {
  font-family: sectionTitleFont;
  font-size: 40px;
  color: var(--vt-c-black);
  margin-left: 45px;
}
</style>

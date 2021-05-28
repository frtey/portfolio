import barba from "@barba/core";
import "./styles.scss";
import "./js/particles";
import { gsap } from "gsap";

const particlesJS = window.particlesJS;

particlesJS.load("particles-js", "./particles.json");


//BARBA SECTION

barba.init({
  // debug: true,
  transitions: [
    {
      name: "toRightTransition",
      // sync: true,

      custom: ({ trigger }) => {
        return (
          trigger.classList &&
          trigger.classList.contains("left-to-right")
        );
      },

      leave(data) {
        return gsap.to(data.current.container, {
          duration: 0.3,
          x: window.innerWidth,
          ease: "power4",
        });
      },

      enter(data) {
        return gsap.from(data.next.container, {
          duration: 0.3,
          x: -window.innerWidth,
          ease: "power4",
        });
      },
    },
    {
      name: "toLeftTransition",
      // sync: true,

      custom: ({ trigger }) => {
        return (
          trigger.classList &&
          trigger.classList.contains("right-to-left")
        );
      },

      leave(data) {
        return gsap.to(data.current.container, {
          duration: 0.3,
          x: -window.innerWidth,
          ease: "power4",
        });
      },

      enter(data) {
        return gsap.from(data.next.container, {
          duration: 0.3,
          x: window.innerWidth,
          ease: "power4",
        });
      },
    },
  ],
});

//MODALS SECTION

const openEls = document.querySelectorAll("[data-open]");
 
for(const el of openEls) {
  el.addEventListener("click", function() {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add("is-visible");
  });
}

document.addEventListener("click", e => {
  if (e.target == document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove("is-visible");
  }
});

document.addEventListener("keyup", e => {
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove("is-visible");
  }
});
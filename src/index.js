import barba from "@barba/core";
import "./styles.scss";
import "./js/particles";
import "./js/sudoku-solver";
import "./js/sudoku-index";
import "./routes/api.js";
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

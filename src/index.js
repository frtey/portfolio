import sudoku from "./js/sudoku-index";
import converter from "./js/converter-index";
import tracker from "./js/tracker-index";
import counter from "./js/counter-index";

import barba from "@barba/core";
import "./styles.scss";
import "./js/particles";
import { gsap } from "gsap";

// PARTICLES JS SECTION

const particlesJS = window.particlesJS;
particlesJS.load("particles-js", "./particles.json");

//BARBA SECTION

barba.init({
  views: [
    {
      namespace: 'sudoku',
      beforeEnter(data) {
        sudoku();
      }
    },
    {
      namespace: 'converter',
      beforeEnter(data) {
        converter();
      }
    },
    {
      namespace: 'tracker',
      beforeEnter(data) {
        tracker();
      }
    },
    {
      namespace: 'counter',
      beforeEnter(data) {
        counter();
      }
    }
  ],

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
    {
      name: "upTransition",
      // sync: true,

      custom: ({ trigger }) => {
        return (
          trigger.classList &&
          trigger.classList.contains("project-card")
        );
      },
      
      leave(data) {
        return gsap.to(data.current.container, {
          duration: 0.4,
          y: -window.innerWidth,
          ease: "power4",
        });
      },

      enter(data) {
        return gsap.from(data.next.container, {
          duration: 0.4,
          y: window.innerWidth,
          ease: "power4",
        });
      },
    },
    {
      name: "downTransition",
      // sync: true,

      custom: ({ trigger }) => {
        return (
          trigger.classList &&
          trigger.classList.contains("link-to-project")
        );
      },

      leave(data) {
        return gsap.to(data.current.container, {
          duration: 0.4,
          y: window.innerWidth,
          ease: "power4",
        });
      },

      enter(data) {
        return gsap.from(data.next.container, {
          duration: 0.4,
          y: -window.innerWidth,
          ease: "power4",
        });
      },
    },
  ],
});

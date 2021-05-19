import barba from "@barba/core";
import "./styles.scss";
import "./js/particles";
import { gsap } from "gsap";

const particlesJS = window.particlesJS;

particlesJS.load("particles-js", "./particles.json", function () {
  console.log("callback - particles.js config loaded");
});

barba.init({
  // debug: true,
  transitions: [
    {
      name: "toRightTransition",
      // sync: true,
      from: {
        namespace: [
          "bio",
          "index",
          "projects"
        ]
      },
      to: {
        namespace: [
          "projects",
          "bio",
          "index"
        ]
      },
      leave(data) {
        return gsap.to(data.current.container, { duration: .3, x: window.innerWidth, ease: "power4" });
      },
      enter(data) {
        return gsap.from(data.next.container, { duration: .3, x: -window.innerWidth, ease: "power4" });
      },
    },
    {
      name: "toLeftTransition",
      // sync: true,
      from: {
        namespace: [
          "bio",
          "index",
          "projects"
        ]
      },
      to: {
        namespace: [
          "index",
          "projects",
          "bio"
        ]
      },
      leave(data) {
        return gsap.to(data.current.container, { duration: .3, x: -window.innerWidth, ease: "power4" });
      },
      enter(data) {
        return gsap.from(data.next.container, { duration: .3, x: window.innerWidth, ease: "power4" });
      },
    },
  ],
});
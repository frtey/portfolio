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
      from: {
        namespace: [
          "index",
          "projects"
        ]
      },
      to: {
        namespace: [
          "index",
          "bio"
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
      from: {
        namespace: [
          "bio",
          "index"
        ]
      },
      to: {
        namespace: [
          "index",
          "projects"
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

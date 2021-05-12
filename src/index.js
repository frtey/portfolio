import barba from "@barba/core";
import barbaCss from '@barba/css';
import "./styles.scss";
import "./js/particles";

const particlesJS = window.particlesJS;

particlesJS.load('particles-js', './particles.json', function() {
  console.log('callback - particles.js config loaded');
});

barba.use(barbaCss);

barba.init({
  transitions: [
    {
      beforeOnce() {
        console.log("Before Once")
      },
      once(){
        console.log('Once')
      },
      afterOnce() {
        console.log("After Once")
      }

    }
  ]
});
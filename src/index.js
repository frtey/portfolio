import barba from "@barba/core";
import barbaCss from '@barba/css';
import "./styles.scss";
import "./js/particles";

// if (module.hot) {
//   // Capture hot update
//   module.hot.accept("./index", () => {
//     const nextComponent = component();

//     // Replace old content with the hot loaded one
//     document.body.replaceChild(nextComponent, demoComponent);

//     demoComponent = nextComponent;
//   });
// }

const particlesJS = window.particlesJS;

particlesJS.load('particles-js', './particles.json', function() {
  console.log('callback - particles.js config loaded');
});

barba.use(barbaCss);

barba.init({
  transitions: [
    {
      beforeOnce() {
        console.log("Befre Once")
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
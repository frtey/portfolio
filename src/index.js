import barba from "@barba/core";
import barbaCss from '@barba/css';

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
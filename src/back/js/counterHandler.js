const { exec } = require("child_process");

function CounterHandler() {
   this.getCount = function (data) {
      return new Promise((resolve) => {
         exec(
            "gswin64c.exe -o - -sDEVICE=inkcov src/back/static/uploads/" +
            data.filename +
            " 2>&1",
            (error, stdout, stderr) => {
               if (error) {
                  console.error(`exec error: ${error}`);
                  return;
               }

               let commandOutputArray = stdout.split("\n");
               let filteredArray = commandOutputArray.filter(
                  (el) => el.charAt(el.length - 1) === "K"
               );

               let filteredSplitArray = [];
               filteredArray.forEach((el) => {
                  filteredSplitArray.push(el.split("  "));
               });

               let NBPages, colorPages;
               NBPages = colorPages = 0;

               filteredSplitArray.forEach((el) => {
                  el[0] = el[0].slice(1);
                  if (el[0] == el[1] && el[1] == el[2]) {
                     NBPages++;
                  } else {
                     colorPages++;
                  }
               });

               let totalPages = NBPages + colorPages;

               resolve({ NBPages, colorPages, totalPages });

               //   console.error(`stderr: ${stderr}`);
            }
         )
      })
  };
}

module.exports = CounterHandler;

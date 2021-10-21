import "babel-polyfill";

export default function counter() {
  const fileSenderButton = document.getElementById("file-sender-btn");
  fileSenderButton.style.display = "none";
  
  const resultArea = document.getElementById("count-result");
  resultArea.style.display = "none";

  document.getElementById("file-upload").onchange = () => {
    document.getElementById("custom-file-upload").style.backgroundColor =
      "#5c510b";
    fileSenderButton.style.display = "inline";
    fileSenderButton.style.marginLeft = "1vw";
    fileSenderButton.style.marginBottom = "0vh";
  };

  function mockFetch() {
    var promise = new Promise(function (resolve, reject) {
      window.setTimeout(function () {
        resolve({ NBPages: 151, colorPages: 47, totalPages: 198 });
      });
    });
    return promise;
  }

  const counterSubmitHandler = async () => {
    const file = document.getElementById("file-upload").files[0];

    const colorResultArea = document.getElementById("colorResult");
    const NBResultArea = document.getElementById("NbResult");
    const totalResultArea = document.getElementById("totalResult");

    const result = await mockFetch();

    // const formData = new FormData();
    // formData.append("pdfFile", file);

    // const data = await fetch("/api/pdfupload", {
    //   method: "POST",
    //   body: formData,
    // });

    // const result = await data.json();

    resultArea.style.display = "inline";

    colorResultArea.innerHTML = "Nombre de pages couleurs : " + result.colorPages;
    NBResultArea.innerHTML =
      "Nombre de pages noirs et blancs : " + result.NBPages;
    totalResultArea.innerHTML =
      "Nombre de pages au total : " + result.totalPages;

    return;
  };

  // EXAMPLE RESPONSE = {"NBPages":151,"colorPages":47,"totalPages":198}

  document
    .getElementById("file-sender-btn")
    .addEventListener("click", counterSubmitHandler);
}

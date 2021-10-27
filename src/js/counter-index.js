import "babel-polyfill";

export default function counter() {
  const fileSenderButton = document.getElementById("file-sender-btn");
  fileSenderButton.style.display = "none";

  const resultArea = document.getElementById("count-result");
  resultArea.style.display = "none";

  document.getElementById("file-upload").onchange = () => {
    document.getElementById("custom-file-upload").style.backgroundColor =
      "#5c510b";
    document.getElementById("custom-file-upload").style.opacity =
      "0.8";
    fileSenderButton.style.display = "inline";
    fileSenderButton.style.marginLeft = "1vw";
    fileSenderButton.style.marginBottom = "0vh";
  };

  function mockFetch() {
    var promise = new Promise(function (resolve, reject) {
      window.setTimeout(function () {
        resolve({ NBPages: 151, colorPages: 47, totalPages: 198 });
      }, 3000);
    });
    return promise;
  }

  const counterSubmitHandler = async () => {
    const file = document.getElementById("file-upload").files[0];

    const colorResultArea = document.getElementById("colorResult");
    const NBResultArea = document.getElementById("NbResult");
    const totalResultArea = document.getElementById("totalResult");

    Loader.open();
    const result = await mockFetch();
    Loader.close();

    // const formData = new FormData();
    // formData.append("pdfFile", file);

    // const data = await fetch("/api/pdfupload", {
    //   method: "POST",
    //   body: formData,
    // });

    // const result = await data.json();

    resultArea.style.display = "inline";
    fileSenderButton.style.display = "none";

    colorResultArea.innerHTML =
      "Nombre de pages couleurs : " + result.colorPages;
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

// LOADER CODE

const Loader = {
  loader: null,
  body: null,
  html: '<span><svg width="40" height="40" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="15"></svg></span>',
  cssClass: "loader",
  check: function () {
    if (this.body == null) {
      this.body = document.getElementsByTagName("body")[0];
    }
  },
  open: function () {
    this.check();
    if (!this.isOpen()) {
      this.loader = document.createElement("div");
      this.loader.setAttribute("id", "loader");
      this.loader.classList.add("loader_website");
      this.loader.innerHTML = this.html;
      this.body.append(this.loader);
      this.body.classList.add(this.cssClass);
    }
    return this;
  },
  close: function () {
    this.check();
    if (this.isOpen()) {
      this.body.classList.remove(this.cssClass);
      this.loader.remove();
    }
    return this;
  },
  isOpen: function () {
    this.check();
    return this.body.classList.contains(this.cssClass);
  },
  ifOpened: function (callback, close) {
    this.check();
    if (this.isOpen()) {
      if (!!close) this.close();
      if (typeof callback === "function") {
        callback();
      }
    }
    return this;
  },
  ifClosed: function (callback, open) {
    this.check();
    if (!this.isOpen()) {
      if (!!open) this.open();
      if (typeof callback === "function") {
        callback();
      }
    }
    return this;
  },
};

import "babel-polyfill";

export default function converter() {
  // function mockFetch() {
  //   var promise = new Promise(function (resolve, reject) {
  //     window.setTimeout(function () {
  //       resolve({ error: "12 liters = 1 gallon" });
  //     }, 500);
  //   });
  //   return promise;
  // }

  const convertHandler = async () => {
    const textArea = document.getElementById("text-input");
    const convertedArea = document.getElementById("json-result");
    const errorArea = document.getElementById("error-msg");

    const stuff = { text: textArea.value };

    const data = await fetch("/api/convert", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(stuff),
    });

    const parsed = await data.json();

    if (parsed.error) {
      convertedArea.style.display = "none";
      errorArea.style.display = "inline";
      errorArea.innerText = JSON.stringify(parsed.error);
      return;
    } else {
      errorArea.style.display = "none";
      convertedArea.innerHTML = parsed.string;
      convertedArea.style.display = "inline";
      return;
    }
  };

  document
    .getElementById("convert-btn")
    .addEventListener("click", convertHandler);
}

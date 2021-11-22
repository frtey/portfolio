import "babel-polyfill";

export default function sentence() {
  // function mockFetch() {
  //   var promise = new Promise(function (resolve, reject) {
  //     window.setTimeout(function () {
  //       resolve({ colorPages: "12", NBPages: "1", totalPages: "13" });
  //     }, 500);
  //   });
  //   return promise;
  // }

  const sentenceGetterHandler = async () => {
    const sentence = document.getElementById("sentence");

    const data = await fetch("/api/getSentence", {
      method: "GET",
    });

    const result = await data.json();

    console.log(result);

    sentence.innerHTML = result.sentence;

    return;
  };

  document
    .getElementById("get-sentence-btn")
    .addEventListener("click", sentenceGetterHandler);
}

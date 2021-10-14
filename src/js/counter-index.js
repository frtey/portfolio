import "babel-polyfill";

export default function counter() {
  const counterSubmitHandler = async () => {
    const file = document.getElementById("file-upload").files[0];
    const resultArea = document.getElementById("jsonResult");

     const formData = new FormData();
     formData.append("pdfFile", file);

    const data = await fetch("/api/pdfupload", {
      method: "POST",
      body: formData,
    });

    const parsed = await data.json();

    resultArea.innerHTML = JSON.stringify(parsed);

    return;
  };

  document
    .getElementById("file-sender-btn")
    .addEventListener("click", counterSubmitHandler);

  /*$(document).ajaxStart(function () {
    $("#loading").show();
    $("#succes").hide();
    $("#submit").attr("disabled", true);
  });
  $(document).ajaxStop(function () {
    $("#loading").hide();
    $("#submit").attr("disabled", false);
  });
  $(document).ready(function () {
    $("#loading").hide();
    $("#succes").hide();
    $("#PDFUploadFile").change(function () {
      var fichier = $("#PDFUploadFile").prop("files")[0];
      if (fichier != undefined) {
        var form_data = new FormData();
        form_data.append("file", fichier);
        $.ajax({
          type: "POST",
          url: "Traitement_Donnees_Compte_Pages.php",
          contentType: false,
          processData: false,
          data: form_data,
          success: function (reponse) {
            if (
              reponse == "failure" ||
              reponse == "notPDF" ||
              reponse == "tooHeavy"
            ) {
              $("#succes").hide();
              if (reponse == "failure") {
                alert("The file couldn't be analyzed");
              } else if (reponse == "notPDF") {
                alert("The file is not a PDF.");
              } else if (reponse == "tooHeavy") {
                alert("The file is too heavy.");
              }
              //If error, we re-initialize the inputs values
              $("#PDFUploadFile").replaceWith(
                $("#PDFUploadFile").val("").clone(true)
              );
              $("#nbPages").attr("value", "0").attr("placeholder", "0");
              $("#nbPagesC").attr("value", "0").attr("placeholder", "0");
              $("#nbPagesNB").attr("value", "0").attr("placeholder", "0");
            } else {
              var obj = JSON.parse(reponse);
              var paragInfo = "";
              if (obj.NbPagesNB == obj.NbPages) {
                paragInfo =
                  "Votre document comporte " +
                  obj.NbPages +
                  " pages, toutes en noir et blanc.";
              } else if (obj.NbPagesC == obj.NbPages) {
                paragInfo =
                  "Votre document comporte " +
                  obj.NbPages +
                  " pages, toutes en couleur.";
              } else {
                paragInfo =
                  "Votre document comporte " +
                  obj.NbPages +
                  " pages, dont " +
                  obj.NbPagesC +
                  " en couleurs et " +
                  obj.NbPagesNB +
                  " en noir & blanc.";
              }
              $("#succes").show().text(paragInfo);
              $("#nbPages")
                .attr("value", obj.NbPages)
                .attr("placeholder", obj.NbPages);
              $("#nbPagesC")
                .attr("value", obj.NbPagesC)
                .attr("placeholder", obj.NbPagesC);
              $("#nbPagesNB")
                .attr("value", obj.NbPagesNB)
                .attr("placeholder", obj.NbPagesNB);
            }
          },
        });
        $("#erreur").hide();
      }
    });
  });*/
}

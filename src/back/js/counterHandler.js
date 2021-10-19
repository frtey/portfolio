const { exec } = require("child_process");
const { standardization } = require("./american-to-british-spelling");

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

  /*
      EXAMPLE DATA OBJECT :
      fieldname: 'pdfFile',
      originalname: 'sample.pdf',
      encoding: '7bit',
      mimetype: 'application/pdf',
      destination: './src/back/static/uploads',
      filename: '1634566573846.pdf',
      path: 'src\\back\\static\\uploads\\1634566573846.pdf',
      size: 3028
   */

  /*   //Ligne de commande interrogeant GhostScript, récupérant un tableau de sortie de commande ($outputs), et un code d'execution de commande ($retour), où 0 est bien, et tout autre chiffre indique problème
   $commandline = escapeshellcmd("gswin64c.exe -o - -sDEVICE=inkcov uploads/" . $_FILES['file']['name'] . " 2>&1");
   exec($commandline, $outputs, $retour);

   //Nettoyage du tableau
   $ProfilsColosPagesTemp = [];
   foreach($outputs as $output) {
      if(substr($output, -1) == "K") { //Ne prend que les éléments se terminant par "K" (donc tout ceux avec les profils colorimétriques de la page) => Tout les éléments du tableau inutiles sont laissés de coté
         array_push($ProfilsColosPagesTemp, $output);
      }
   }

   //Création tableau de tableau pour parcours ultérieur
   $ProfilsColosPages = [];
   foreach($ProfilsColosPagesTemp as $ProfilTemp) {
      $ProfilTemp = explode(" ", $ProfilTemp);
      $Profil = [];
      //Suppression des éléments vides
      for($i = 0; $i < count($ProfilTemp); $i++) {
         if(!empty($ProfilTemp[$i])) {
            array_push($Profil, $ProfilTemp[$i]);
         }
      }
      array_push($ProfilsColosPages, $Profil);
   }

   //Tests couleurs, compte du nombre de pages couleurs et peuplement d'un tableau $tabPages avec numéros des pages couleurs
   $tabPagesCouleurs = [];
   $i = 1;
   $nbPages = count($ProfilsColosPages); //Nombre de pages total
   foreach($ProfilsColosPages as $Page) {
      if ($Page[0] > 0 || $Page[1] > 0 || $Page[2] > 0) {// && (($Page[0] != $Page[1]) || ($Page[2] != $Page[1]))) { //La partie commentée ajoute des conditions permettant de considérer le grayscale comme non-couleur. Produit des erreurs si une page possède la même répartition de CMYK
         array_push($tabPagesCouleurs, $i);
      }
      $i++;
   }

   //Nombre de pages noir et blanc
   $nbPagesNB = $nbPages - count($tabPagesCouleurs);

   //Création d'un tableau avec clés, puis transformation en JSON renvoyé à la page formulairePDF.ph pour affichage
   $tabFinal = [
      'NbPages' => $nbPages,
      'NbPagesC' => count($tabPagesCouleurs),
      'NbPagesNB' => $nbPagesNB,
      'TabPages' => $tabPagesCouleurs,
   ];
   $tabFinal = json_encode($tabFinal);
   print_r($tabFinal);
} catch(Expression $e) {
   echo "failure";*/
}

module.exports = CounterHandler;

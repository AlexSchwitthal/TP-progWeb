
// Ecrire une fonction JavaScript showContent() qui permet d'afficher le con-
// tenu du div correspondant au titre sur lequel on clique.
function showContent(number) {
  document.getElementById("title" + number).style.display = "";
  var divs = document.getElementsByTagName("div");
}

// Ecrire une fonction JavaScript hideAllDivs() qui permet de masquer le
// contenu de tous les div du document.
function hideAllDivs() {
  var divs = document.getElementsByTagName("div");
  for (const div of divs) {
    div.style.display = "none";
  }
}

// Ecrire une fonction alertTitle() permettant d'afficher (avec la fonction
// JavaScript alert) le contenu du énième titre, défini par le champ de saisie
// title.
function alertTitle() {
  var input = document.getElementById("title").value;
  var title = document.getElementById("title" + input);
  if(title == null | title.innerHTML == "") {
    alert("ce titre n'existe pas !");
  }
  else {
    alert(title.innerHTML);
  }
}

// Ecrire la fonction deleteTitle() permettant d'effacer le contenu du titre
// défini par le champ title, autrement dit de supprimer le noeud fils de type
// texte.
function deleteTitle() {

}

// Ecrire une fonction deneTitle() qui permet d'aecter le contenu du titre
// défini par le champ title avec la valeur "Nouveau titre". Il faut commencer
// par tester que le titre a ou non deja une valeur (nud texte) avant l'ajout,
// an de la supprimer si besoin.
function defineTitle() {

}

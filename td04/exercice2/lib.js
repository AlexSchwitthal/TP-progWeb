
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
// -- fonction alertTitle() avec l'affichage du contenu de chaque
function alertTitle() {
  var input = document.getElementById("title").value;
  var title = document.getElementById("title" + input);
  if(title == null ) {
    alert("ce titre n'existe pas !");
  }
  else if(title.innerHTML == "") {
    alert("ce titre ne contient rien !");
  }
  else {
    var text = '';
    var allParagraphs = document.querySelectorAll("#title" + input + " > p");
    for(var p of allParagraphs) {
      text += p.innerHTML + "\n";
    }
    alert(text);
  }
}

// -- fonction alertTitle() avec l'affichage direct du contenu de la div -- //
// function alertTitle() {
//   var input = document.getElementById("title").value;
//   var title = document.getElementById("title" + input);
//   if(title == null ) {
//     alert("ce titre n'existe pas !");
//   }
//   else if(title.innerHTML == "") {
//     alert("ce titre ne contient rien !");
//   }
//   else {
//     alert(title.innerHTML);
//   }
// }

// Ecrire la fonction deleteTitle() permettant d'effacer le contenu du titre
// défini par le champ title, autrement dit de supprimer le noeud fils de type
// texte.
function deleteTitle() {
  var input = document.getElementById("titleDelete").value;
  var title = document.getElementById("title" + input);
  if(title == null ) {
    alert("ce titre n'existe pas !");
  }
  else {
    while (title.firstChild) {
      title.removeChild(title.lastChild);
    }
  }
}

// Ecrire une fonction defineTitle() qui permet d'affecter le contenu du titre
// défini par le champ title avec la valeur "Nouveau titre". Il faut commencer
// par tester que le titre a ou non déjà une valeur (noeud texte) avant l'ajout,
// afin de la supprimer si besoin.
function defineTitle() {
  var input = document.getElementById("titleDefine").value;
  var title = document.getElementById("title" + input);

  if(title == null ) {
    alert("ce titre n'existe pas !");
  }
  else {
    while (title.firstChild) {
      title.removeChild(title.lastChild);
    }
    var p = document.createElement("p");
    p.innerHTML = "Nouveau titre";
    title.appendChild(p);
  }
}

// initialisation du canvas
let canvas = document.getElementById("canvas");
canvas.width = 1200;
canvas.height = 600;
var ctx = canvas.getContext('2d');

// initialisation des variables

// correspond à la valeur de la marge du body, afin d'éviter un décalage entre les coordonnées du points et du canvas
var offsetX = 20;
var offsetY = 20;

var selected = 'crayon'; // element de dessin selectionné
var taille = 12; // taille en px du dessin
var actif = false; // actif est true si le clic souris est enfoncé, false sinon


// coordonnées X,Y de départ, valeur changer à chaque clic de la souris sur le canvas
var startX;
var startY;

// liste des points sauvegardés
var storedPoints = [];
var listPoints = [];

// liste des lignes sauvegardés
var storedLines = [];

// liste des rectangles sauvegardés
var storedRects = [];

// liste des cercles sauvegardés
var storedCircles = [];


// ajout des évenements sur le canvas (voir fonction ci-dessous)
canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);

// quand la souris est enfoncé :
// changement de la valeur d'actif et de startX, startY sur la position courante
function onMouseDown(e) {
  actif = true;
  startX = parseInt(e.clientX - offsetX);
  startY = parseInt(e.clientY - offsetY);
}

// quand la souris est relaché :
// ajoute l'element dessiné à la liste lui correspondant et actualise le canvas
function onMouseUp(e) {
  actif = false;
  let x = parseInt(e.clientX - offsetX);
  let y = parseInt(e.clientY - offsetY);
  switch(selected) {
    case 'crayon':
      storedPoints.push({
        startX: startX,
        startY: startY,
        listPoints : listPoints.slice(0),
        taille: taille
      })
      listPoints.length = 0;
      break;

    case 'ligne' :
      storedLines.push({
          x1: startX,
          y1: startY,
          x2: x,
          y2: y,
          taille: taille
      });
      break;

    case 'rectangle':
      let rect = getRect(startX, startY, x, y);
      storedRects.push({
        leftX: rect.leftX,
        topY: rect.topY,
        rightX: rect.rightX,
        bottomY: rect.bottomY,
        taille: taille
      })
      break;

    case 'cercle':
      storedCircles.push({
        startX : startX,
        startY : startY,
        x : x,
        y : y,
        taille: taille
      });
      break;
  }
  draw();
}

// quand la souris est bougé :
// selon l'outils de dessin selectionné, fait un dessin dynamique qui ne sera sauvegardé
// qu'au relachement de la souris (voir onMouseUp)
function onMouseMove(e) {
  var x = parseInt(e.clientX - offsetX);
  var y = parseInt(e.clientY - offsetY);

  if(!actif) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
  else {
    switch (selected) {
      case 'crayon':
        ctx.lineTo(x, y);
        ctx.lineWidth = taille;
        ctx.strokeStyle = "black";
        ctx.stroke();

        listPoints.push({
          x: x,
          y: y
        })
        break;

      case 'ligne':
        draw();
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.lineWidth = taille;
        ctx.strokeStyle = "black";
        ctx.stroke();
        break;

      case 'rectangle':
        draw();
        let rect = getRect(startX, startY, x, y);
        ctx.beginPath();
        ctx.rect(rect.leftX, rect.topY, rect.rightX - rect.leftX, rect.bottomY - rect.topY);
        ctx.lineWidth = taille;
        ctx.strokeStyle = "black";
        ctx.stroke();
        break;

      case 'cercle':
        draw();
        ctx.beginPath();
        for (var i = 0 * Math.PI; i <= 2.01 * Math.PI; i += 0.01 ) {
            let xPos = startX - ((x - startX) * Math.sin(i)) * Math.sin(0 * Math.PI) + ((x - startX) * Math.cos(i)) * Math.cos((x - startX) * Math.PI);
            let yPos = startY + ((y - startY) * Math.cos(i)) * Math.sin(0 * Math.PI) + ((y - startY) * Math.sin(i)) * Math.cos((y - startY) * Math.PI);
            if (i == 0) {
                ctx.moveTo(xPos, yPos);
            } else {
                ctx.lineTo(xPos, yPos);
            }
        }
        ctx.lineWidth = taille;
        ctx.strokeStyle = "black";
        ctx.stroke();
        break;
    }
  }
}

// fonction permettant l'actualisation du dessin, le but est ainsi de redéssiné tout ce qui n'est pas temporaire
function draw() {
  // réinitialise le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // redessine la totalité des points (outils crayon)
  for (var i = 0; i < storedPoints.length; i++) {
    ctx.beginPath();
    ctx.moveTo(storedPoints[i].startX, storedPoints[i].startY);
    for(var j = 0; j < storedPoints[i].listPoints.length; j++) {
      ctx.lineTo(storedPoints[i].listPoints[j].x, storedPoints[i].listPoints[j].y);

    }
    ctx.lineWidth = storedPoints[i].taille;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  // redessine la totalité des lignes
  for (var i = 0; i < storedLines.length; i++) {
    ctx.beginPath();
    ctx.moveTo(storedLines[i].x1, storedLines[i].y1);
    ctx.lineTo(storedLines[i].x2, storedLines[i].y2);
    ctx.lineWidth = storedLines[i].taille;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  // redessine la totalité des rectaangles
  for (var i = 0; i < storedRects.length; i++) {
    ctx.beginPath();
    ctx.rect(storedRects[i].leftX, storedRects[i].topY,
      storedRects[i].rightX - storedRects[i].leftX, storedRects[i].bottomY - storedRects[i].topY);
    ctx.lineWidth = storedRects[i].taille;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  // redessine la totalité des cercles
  for (var i = 0; i < storedCircles.length; i++) {
    ctx.beginPath();
    for (var j = 0 * Math.PI; j < 2.01 * Math.PI; j += 0.01 ) {
        let circleX = storedCircles[i].startX -
        ((storedCircles[i].x - storedCircles[i].startX) * Math.sin(j))
        * Math.sin(0 * Math.PI)
        + ((storedCircles[i].x - storedCircles[i].startX) * Math.cos(j))
        * Math.cos((storedCircles[i].x - storedCircles[i].startX) * Math.PI);

        let circleY = storedCircles[i].startY +
        ((storedCircles[i].y - storedCircles[i].startY) * Math.cos(j))
        * Math.sin(0 * Math.PI)
        + ((storedCircles[i].y - storedCircles[i].startY) * Math.sin(j))
        * Math.cos((storedCircles[i].y - storedCircles[i].startY) * Math.PI);

        if (j == 0) {
            ctx.moveTo(circleX, circleY);
        }
        else {
            ctx.lineTo(circleX, circleY);
        }
    }

    ctx.lineWidth = taille;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}

// -- fonctions secondaire -- //

// réinitialise totalement le canvas, en supprimant le contenu de chacune des listes
// appelé via le bouton de réinitialisation
function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  storedLines.length = 0;
  storedPoints.length = 0;
  storedRects.length = 0;
  storedCircles.length = 0;
}

// change la taille du crayon
// appelé via la barre de changement de taille du crayon
function changeSize(size) {
  taille = size;
  document.getElementById("affichage").innerHTML = size;
}

// change l'élément de dessin selectionné
// appelé au clic de chacun des boutons (sauf le bouton de réinitilisation)
function changeTo(element) {
  const buttons = document.querySelectorAll('button');
  if (element != 'reset') {
    for (const button of buttons) {
      if (button.id == element) {
        button.classList.remove('btn-default');
        button.classList.add('btn-primary');
      }
      else if (button.classList.contains('btn-primary')) {
        button.classList.remove('btn-primary');
        button.classList.add('btn-default');
      }
    }
    selected = element;
  }
}

// fonction retournant un rectangle
function getRect(startX, startY, currentX, currentY) {
  let rect = new Object();
  if (startX < currentX) {
    rect.leftX = startX;
    rect.rightX = currentX;
  }
  else {
    rect.leftX = currentX;
    rect.rightX = startX;
  }

  if (startY < currentY) {
    rect.topY = startY;
    rect.bottomY = currentY;
  }
  else {
    rect.topY = currentY;
    rect.bottomY = startY;
  }
  return rect;
}

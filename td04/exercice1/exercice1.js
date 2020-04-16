let canvas = document.getElementById("canvas");
canvas.width = 1200;
canvas.height = 600;
var ctx = canvas.getContext('2d');
var offsetX = 20;
var offsetY = 20;
var selected = 'crayon';
var actif = false;
var taille = 12;

var startX;
var startY;
var movetoX;
var moveToY;
var isFirst = false;
var storedPoints = [];
var storedLines = [];

canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);



function onMouseDown(e) {
  actif = true;
  startX = parseInt(e.clientX - offsetX);
  startY = parseInt(e.clientY - offsetY);
}

function onMouseUp(e) {
  actif = false;
  var mouseX = parseInt(e.clientX - offsetX);
  var mouseY = parseInt(e.clientY - offsetY);
  switch(selected) {
    case 'ligne' :
      storedLines.push({
          x1: startX,
          y1: startY,
          x2: mouseX,
          y2: mouseY,
          taille: taille
      });
      break;
  }
  draw();
}

function onMouseMove(e) {
  var x = parseInt(e.clientX - offsetX);
  var y = parseInt(e.clientY - offsetY);

  // Get the mouse position.
  if (e.layerX >= 0) {
    // Firefox
    x = e.layerX;
    y = e.layerY;
  }
  else if (e.offsetX >= 0) {
    // Opera
    x = e.offsetX;
    y = e.offsetY;
  }


  if(!actif) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    isFirst = true;
    moveToX = x;
    moveToY = y;
  }
  else {
    switch (selected) {
      case 'crayon':
        ctx.lineTo(x, y);
        ctx.lineWidth = taille;
        ctx.strokeStyle = "black";
        ctx.stroke();
        storedPoints.push({
            x: x,
            y: y,
            taille: taille,
            isFirst: isFirst,
            moveToX: moveToX,
            moveToY: moveToY
        });
        if(isFirst) {
          isFirst = false;
        }
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
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < storedLines.length; i++) {
    ctx.beginPath();
    ctx.moveTo(storedLines[i].x1, storedLines[i].y1);
    ctx.lineTo(storedLines[i].x2, storedLines[i].y2);
    ctx.lineWidth = storedLines[i].taille;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  var tempMoveToX = -1;
  var tempMoveToY = -1;
  console.log(storedPoints.length);
  for (var i = 0; i < storedPoints.length; i++) {
    if(tempMoveToX != storedPoints[i].moveToX) {
      ctx.beginPath();
      ctx.moveTo(storedPoints[i].moveToX, storedPoints[i].moveToY);
      tempMoveToX = storedPoints[i].moveToX;
      tempMoveToY = storedPoints[i].moveToY;
    }
    ctx.lineTo(storedPoints[i].x, storedPoints[i].y);
    ctx.lineWidth = storedPoints[i].taille;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}

// -- function secondaire -- //
function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  storedLines.length = 0;
  storedPoints.length = 0;
}

function changeSize(size) {
  taille = size;
  var affichage = document.getElementById("affichage");
  affichage.innerHTML = size;
}

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

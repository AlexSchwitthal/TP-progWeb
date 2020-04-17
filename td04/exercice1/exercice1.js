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
var circleX;
var circleY;

var storedPoints = [];
var listPoints = [];
var storedLines = [];
var storedRects = [];
var storedCircles = [];
var listCircles = [];

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
  var x = parseInt(e.clientX - offsetX);
  var y = parseInt(e.clientY - offsetY);
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
        // ctx.beginPath();
        // ctx.arc(startX, startY,
        //   Math.sqrt(Math.abs(x - startX) + Math.abs(y - startY))
        // * Math.sqrt(Math.abs(x - startX) + Math.abs(y - startY)),
        // 0, 2 * Math.PI);
        // ctx.lineWidth = taille;
        // ctx.strokeStyle = "black";
        // ctx.stroke();
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

  for (var i = 0; i < storedRects.length; i++) {
    ctx.beginPath();
    ctx.rect(storedRects[i].leftX, storedRects[i].topY,
      storedRects[i].rightX - storedRects[i].leftX, storedRects[i].bottomY - storedRects[i].topY);
    ctx.lineWidth = storedRects[i].taille;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  for (var i = 0; i < storedCircles.length; i++) {
    //ctx.beginPath();
    // ctx.arc(storedCircles[i].startX, storedCircles[i].startY,
    //   Math.sqrt(Math.abs(storedCircles[i].x - storedCircles[i].startX) + Math.abs(storedCircles[i].y - storedCircles[i].startY))
    // * Math.sqrt(Math.abs(storedCircles[i].x - storedCircles[i].startX) + Math.abs(storedCircles[i].y - storedCircles[i].startY)),
    // 0, 2 * Math.PI);
    // ctx.lineWidth = storedCircles[i].taille;
    // ctx.strokeStyle = "black";
    // ctx.stroke();
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
    // for(var j = 0; j < storedCircles[i].listCircles.length; j++) {
    //   if(j == 0) {
    //     ctx.moveTo(storedCircles[i].listCircles[j].x, storedCircles[i].listCircles[j].y);
    //   }
    //   else {
    //     ctx.lineTo(storedCircles[i].listCircles[j].x, storedCircles[i].listCircles[j].y);
    //   }
    // }

    ctx.lineWidth = taille;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}

// -- function secondaire -- //
function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  storedLines.length = 0;
  storedPoints.length = 0;
  storedRects.length = 0;
  storedCircles.length = 0;
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

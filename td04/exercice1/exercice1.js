let canvas = document.getElementById("canvas");
canvas.width = 1200;
canvas.height = 600;
var ctx = canvas.getContext('2d');

var selected = 'crayon';
var actif = false;
var taille = 12;

canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('mousedown', function() {
  actif = true;
});
canvas.addEventListener('mouseup', function() {
  actif = false;
});

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

function onMouseMove(ev) {
  var x, y;
  // Get the mouse position.
  if (ev.layerX >= 0) {
    // Firefox
    x = ev.layerX;
    y = ev.layerY;
  }
  else if (ev.offsetX >= 0) {
    // Opera
    x = ev.offsetX;
    y = ev.offsetY;
  }

  if (!actif) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    switch (selected) {
      case 'crayon':
        ctx.lineTo(x, y);
        ctx.lineWidth = taille;
        ctx.strokeStyle = "black";
        ctx.stroke();
        break;
      case 'gomme':
        ctx.lineTo(x, y);
        ctx.lineWidth = taille * 2;
        ctx.strokeStyle = "white";
        ctx.stroke();
        break;
    }
  }
}

function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function changeSize(size) {
  taille = size;
  var affichage = document.getElementById("affichage");
  affichage.innerHTML = size;
}

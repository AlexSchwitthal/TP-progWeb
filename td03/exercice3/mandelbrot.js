let canvas = document.getElementById("cvn");
canvas.width  = 750;
canvas.height = 750;
var ctx = canvas.getContext('2d');

const mandelbrot =  {
  limit : 50,
  xmin : -2,
  xmax : 2,
  ymin : -2,
  ymax : 2,

  inSet: function(x, y) {
    let i = 1;
    let cReel = 0;
    let cImag = 0;

    for(i = 1; i < this.limit; i++) {

      let cTempReel = cReel;
      cReel = cReel * cReel - cImag * cImag + x;
      cImag = 2 * cTempReel * cImag + y;

      if(cReel * cReel + cImag * cImag > 4) {
        return (this.limit-i)/this.limit;
      }
    }
    return (this.limit-i)/this.limit;
  },

  draw: function() {
      for(let x = 0; x < canvas.width; x++) {
        for(let y = 0; y < canvas.height; y++) {
          let detail = 200;
          let centrage = 2;
          let result = this.inSet(x/detail - centrage, y/detail - centrage);

          // --- version "classique" en noir et blanc ---
          //let v = 1 - result * this.limit;
          // let t = 256 - Math.floor(256 * v);
          // ctx.fillStyle = 'rgb(' + t + ', ' + t + ', ' + t + ')';

          // --- version avec des nuances de bleu pour une meilleure visibilité ---
          ctx.fillStyle = 'hsl(230, 100%, ' + (result * 100) + '%)';

          ctx.fillRect(x,y, 1,1);
        }
      }
    }

}

// doivent être supérieur à 0
console.log(mandelbrot.inSet(-2, 2));
console.log(mandelbrot.inSet(2, 0));
console.log(mandelbrot.inSet(2, 1));

// doivent être égal à 0
console.log(mandelbrot.inSet(0, 0));
console.log(mandelbrot.inSet(-0.5, 0));
console.log(mandelbrot.inSet(0, 0.5));


// calcul du temps d'exécution
var t0 = performance.now();
mandelbrot.draw();
var t1 = performance.now();
document.getElementById("temps").innerHTML = "l'image a été déssinée en " + (t1 - t0) + " millisecondes, avec une limite de " + mandelbrot.limit + ", sur un canvas de taille " + canvas.height + "x" + canvas.width;

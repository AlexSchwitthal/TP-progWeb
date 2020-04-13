const mandelbrot =  {
  limit : 50,
  xmin : -2,
  xmax : 2,
  ymin : -2,
  xmax : 2,

  inSet: function(cx, cy) {
    let z = 0;
    for(let i = 1; i <= this.limit; i++) {
      let c = cx + i * cy;
      z = z * z + c;

      if(z >= 2) {
        return (this.limit-i)/this.limit;
      }
    }
    return 0;
  }
}

console.log(mandelbrot.inSet(-2, 2));
console.log(mandelbrot.inSet(2, 0));
console.log(mandelbrot.inSet(2, 1));

console.log(mandelbrot.inSet(0, 0));
console.log(mandelbrot.inSet(-0.5, 0));
console.log(mandelbrot.inSet(0, 0.5));

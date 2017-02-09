
console.log('main');
console.log('controls',controls);

const BOUNDS = {xl: 0, xr: 800, yt: 0, yb: 600};

var pieces = [];

function draw(){




  var d=0;
  for(let y=BOUNDS.yt+controls.bezel; y<BOUNDS.yb-controls.bezel; y+=controls.pieceSize){
    for(let x=BOUNDS.xl+controls.bezel; x<BOUNDS.xr-controls.bezel; x+=controls.pieceSize){
      let piece = new Vec2(x,y);

      pieces.push(piece);

      var dot;
      if (pieces.length <= d) {
        dot = document.createElementNS(svgNS,'circle');
        dotGroup.appendChild(dot);
        console.log('dot',d,dot);
      }// else {
      //   dot = dotGroup.children[i];
      // }



      // dot.setAttributeNS(null,'cx',x);
      // dot.setAttributeNS(null,'cy',y);
      // dot.setAttributeNS(null,'r',5);
      d++;
    }
  }

}

draw();

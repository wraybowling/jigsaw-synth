
console.log('main');
console.log('controls',controls);

const BOUNDS = {xl: 0, xr: 800, yt: 0, yb: 600};

var pieces = [];
var lines = [];

function draw(){

  let d=0;
  for(let y=BOUNDS.yt+controls.bezel; y<BOUNDS.yb-controls.bezel; y+=controls.pieceSize){
    for(let x=BOUNDS.xl+controls.bezel; x<BOUNDS.xr-controls.bezel; x+=controls.pieceSize){
      if (pieces.length <= d) {
        let piece = new Vec2(x,y);
        piece.el = document.createElementNS(svgNS,'circle');
        dotGroup.appendChild(piece.el);
        pieces.push(piece);
      }

        pieces[d].el.setAttributeNS(null,'cx',x);
        pieces[d].el.setAttributeNS(null,'cy',y);
        pieces[d].el.setAttributeNS(null,'r',5);

      // else {
      //   dot = dotGroup.children[i];
      // }

      d++;
    }
  }

  // remove old pieces
  for(let i=0; i<(pieces.length - d); i++){
    pieces[pieces.length-1].el.remove();
    pieces.pop();
  }

  // build piece scaffolding
  let v = new Voronoi();
  let vData = v.compute(pieces,BOUNDS);
  let l=0;
  for(; l<vData.edges.length; l++){
    let p1 = vData.edges[l].va;
    let p2 = vData.edges[l].vb;

    if(l >= lines.length) {
      let line = document.createElementNS(svgNS,'line');
      lineGroup.appendChild(line);
      lines.push(line);
    }
    lines[l].setAttributeNS(null,'x1',p1.x);
    lines[l].setAttributeNS(null,'y1',p1.y);
    lines[l].setAttributeNS(null,'x2',p2.x);
    lines[l].setAttributeNS(null,'y2',p2.y);
  }

  // remove old lines
  for(let i=0; i<(lines.length - l); i++){
    lines[lines.length-1].remove();
    lines.pop();
  }

}

draw();

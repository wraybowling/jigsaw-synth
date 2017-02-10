
console.log('main');
console.log('controls',controls);

const BOUNDS = {xl: 0, xr: 800, yt: 0, yb: 600};

var pieces = [];
var lines = [];

const v = new Voronoi();

function draw(){

  let d=0;
  for(let y=BOUNDS.yt+controls.bezel; y<BOUNDS.yb-controls.bezel; y+=controls.pieceSize){
    for(let x=BOUNDS.xl+controls.bezel; x<BOUNDS.xr-controls.bezel; x+=controls.pieceSize){
      if (d >= pieces.length) {
        let piece = new Vec2(x,y);
        piece.el = document.createElementNS(svgNS,'circle');
        dotGroup.appendChild(piece.el);
        pieces.push(piece);
      }

      pieces[d].originX = x;
      pieces[d].originY = y;
      pieces[d].randomize();
      pieces[d].el.setAttributeNS(null,'cx',pieces[d].x);
      pieces[d].el.setAttributeNS(null,'cy',pieces[d].y);
      pieces[d].el.setAttributeNS(null,'r',5);

      d++;
    }
  }

  // remove old pieces
  for(let i=0; i<=(pieces.length - d); i++){
    dotGroup.lastChild.remove();
    pieces.pop();
  }

  // build piece scaffolding

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

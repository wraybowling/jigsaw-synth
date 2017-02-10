
console.log('main');
console.log('controls',controls);

const BOUNDS = {xl: 0, xr: 800, yt: 0, yb: 600};

var pieces = [];
var lines = [];

const v = new Voronoi();

function draw(){

  // round the size of the pieces so the bezel is more uniform
  xRange = (BOUNDS.xr - BOUNDS.xl - controls.bezel*2);
  xSlices = Math.ceil(xRange / controls.pieceSize);
  xLength = xRange / xSlices;
  yRange = (BOUNDS.yb - BOUNDS.yt - controls.bezel*2);
  ySlices = Math.ceil(yRange / controls.pieceSize);
  yLength = yRange / ySlices;

  let p=0; // piece index
  for(let y=0; y<ySlices; y++){
    for(let x=0; x<xSlices; x++){
      if (p >= pieces.length) {
        let piece = new Vec2(0,0);
        piece.el = document.createElementNS(svgNS,'circle');
        piece.el.setAttributeNS(null,'r',3);
        dotGroup.appendChild(piece.el);
        pieces.push(piece);
      }

      pieces[p].originX = (x + 0.5)*xLength + controls.bezel;
      pieces[p].originY = (y + 0.5)*yLength + controls.bezel;
      pieces[p].randomize();
      pieces[p].el.setAttributeNS(null,'cx',pieces[p].x);
      pieces[p].el.setAttributeNS(null,'cy',pieces[p].y);

      p++;
    }
  }

  // remove old pieces
  for(let i=0; i<=(pieces.length - p); i++){
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


console.log('main');
console.log('controls',controls);

const BOUNDS = {xl: 0, xr: 1200, yt: 0, yb: 800};

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
  for(; p<pieces.length; p++){
    pieces[p].el.remove();
    pieces.splice(p,1);
  }

  // build piece scaffolding

  let vData = v.compute(pieces,BOUNDS);
  // console.log(vData);
  let loops = Math.max(vData.edges.length,lineGroup.childElementCount);
  for (i=0; i<loops; i++) {
    if (i < vData.edges.length) {
      let p1 = vData.edges[i].va;
      let p2 = vData.edges[i].vb;
      if (i === lineGroup.childElementCount) {
        let line = document.createElementNS(svgNS,'line');
        lineGroup.appendChild(line);
        let tab = document.createElementNS(svgNS,'path');
        tabGroup.appendChild(tab);
      }
      lineGroup.children[i].setAttributeNS(null,'x1',p1.x);
      lineGroup.children[i].setAttributeNS(null,'y1',p1.y);
      lineGroup.children[i].setAttributeNS(null,'x2',p2.x);
      lineGroup.children[i].setAttributeNS(null,'y2',p2.y);
      tabGroup.children[i].setAttributeNS(null,'d',drawTabs(p1,p2));
    }
  }
  // remove old tabs
  while(vData.edges.length < lineGroup.childElementCount){
    lineGroup.lastChild.remove();
  }
}

draw();

function saveSVG(){
  console.log('exporting...');
  download(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="1200" height="1200" viewbox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" >
<style>
  path{
    stroke:black;
    stroke-width:1px;
    fill:none;
  }
</style>

${tabGroup.outerHTML}
</svg>
    `,'puzzle.svg','text/svg');
}

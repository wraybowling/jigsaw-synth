// DOM
const voronoise = document.getElementById('voronoise');
const dotGroup = document.getElementById('dots');
const lineGroup = document.getElementById('lines');
const svgNS = 'http://www.w3.org/2000/svg';
const slider = document.getElementById('points');

// more stuff
const XMAX = 800;
const YMAX = 600;
let POINTS = 50;
let pointArray = [];

function draw(){
  // clear
  pointArray = [];

  while(dotGroup.lastChild){
    dotGroup.lastChild.remove();
  }

  while(lineGroup.lastChild){
    lineGroup.lastChild.remove();
  }

  // build
  for(let i=0; i<POINTS; i++){
    let x = Math.random()*XMAX;
    let y = Math.random()*YMAX;
    let dot = document.createElementNS(svgNS,'circle');
    pointArray.push({x:x,y:y,el:dot});
    dot.setAttributeNS(null,'cx',x);
    dot.setAttributeNS(null,'cy',y);
    dot.setAttributeNS(null,'r',5);
    dotGroup.appendChild(dot);
  }

  //console.log(pointArray);


  /////////////////////////////

  let v = new Voronoi();

  var bbox = {xl: 0, xr: 800, yt: 0, yb: 600};

  let d = v.compute(pointArray,bbox);

  // set up grid
  let rows = Math.floor(Math.sqrt(POINTS));
  let cols = Math.round(Math.sqrt(POINTS));

  for(let i=0; i<d.edges.length; i++){
    let p1 = d.edges[i].va;
    let p2 = d.edges[i].vb;

    let line = document.createElementNS(svgNS,'line');
    line.setAttributeNS(null,'x1',p1.x);
    line.setAttributeNS(null,'y1',p1.y);
    line.setAttributeNS(null,'x2',p2.x);
    line.setAttributeNS(null,'y2',p2.y);

    let lineLength = Math.sqrt(Math.pow(p1.x-p2.x,2) + Math.pow(p1.y-p2.y,2));

    let r = Math.floor(Math.random()*150);
    let g = Math.floor(Math.min(lineLength*2,255));
    let b = 0;
    let sColor = ['stroke:rgb('+r,g,b+')'].join(',');
    line.setAttributeNS(null,'style',sColor);
    lineGroup.appendChild(line);
  }
}

draw();


// interaction
points.oninput = function(){
  POINTS = this.value;
  draw();
  //console.log(pointArray[this.value]);
  //pointArray[this.value].el.remove();
}

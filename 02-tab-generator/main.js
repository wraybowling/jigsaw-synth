// utilities
function lerp(v0, v1, t){
  return (1 - t) * v0 + t * v1;
}

function lerpVec(v0, v1, t){
  return {
    x: lerp(v0.x, v1.x, t),
    y: lerp(v0.y, v1.y, t)
  }
}

// DOM
const PATH = document.getElementById('squiggle');
const VIZ = document.getElementById('visualization');

const DEMO = document.getElementById('demo');
const WOGGLE = 30;
const OFFSET_BASE = 1.5;
const SCURVE_BASE = 0.2;

// Controllable Parameters
const tabWidthSlider = document.getElementById('tabWidth');
let tabWidth = tabWidthSlider.value;
const offsetSlider = document.getElementById('offset');
let offset = offsetSlider.value;
const overshootSlider = document.getElementById('overshoot');
let overshoot = overshootSlider.value;
const wiggleSlider = document.getElementById('wiggle');
let wiggle = wiggleSlider.value;
const woggleSlider = document.getElementById('woggle');
let woggle = woggleSlider.value;
const leadSlider = document.getElementById('lead');
let lead = leadSlider.value;

// Coordinates
var A = [100,100];
var B = [500,300];

function drawPegs(){

  let length = Math.sqrt(Math.pow(A[0]-B[0],2) + Math.pow(A[1]-B[1],2));

  let slices = Math.ceil(length / tabWidth);

  let theta = Math.atan2(B[0] - A[0], B[1] - A[1]);

  let slope_y = Math.sin(theta);
  let slope_x = Math.cos(theta);

  // set the start point
  // draw the first handle manually
  var sequence_s = ['M',A,'C'];
  var sequence_v = ['M',A,'L'];
  var flipflop = 1;

  let firstHandle = [
    lerp(A[0],B[0],1/slices*overshoot),
    lerp(A[1],B[1],1/slices*overshoot)
  ];
  sequence_s.push(firstHandle);
  sequence_v.push(firstHandle);

  // generate tabs and blanks
  console.group('loop');
  for(let i=1; i<slices; i++){

    if(i===2) sequence_s.push('S');
    let t = i/slices;

    // lerpX = ;
    // lerpX += (Math.random() - 0.5) * WOGGLE;
    // lerpY = ;
    // lerpY += (Math.random() - 0.5) * WOGGLE;

    // flip flop
    flipflop *= -1;

    let mult = 1 - Math.random() * wiggle;

    let offsetX = flipflop * slope_x * offset * mult;// / slices;
    let offsetY = flipflop * slope_y * offset * mult;// / slices;

    // leading up to anchor
    let handle = [
      lerp(A[0],B[0],t-overshoot*mult/slices) + offsetX + Math.random()*woggle-woggle/2,
      lerp(A[1],B[1],t-overshoot*mult/slices) - offsetY + Math.random()*woggle-woggle/2
    ];
    sequence_s.push(handle);
    sequence_v.push(handle);
    // anchor
    let anchor = [
      lerp(A[0],B[0],t) + offsetX + Math.random()*woggle-woggle/2,
      lerp(A[1],B[1],t) - offsetY + Math.random()*woggle-woggle/2
    ];
    sequence_s.push(anchor);
    sequence_v.push(anchor);
    console.log('slices',slices);

    if(slices === 2){
      let secondLastHandle = [
        lerp(A[0],B[0],(slices-1)/slices+overshoot*mult/slices) + offsetX + Math.random()*woggle-woggle/2,
        lerp(A[1],B[1],(slices-1)/slices+overshoot*mult/slices) - offsetY + Math.random()*woggle-woggle/2
      ];
      sequence_s.push(secondLastHandle);
      sequence_v.push(secondLastHandle);
    }
  }
  console.groupEnd();



  let lastHandle = [
    lerp(A[0],B[0],(slices-overshoot)/slices),
    lerp(A[1],B[1],(slices-overshoot)/slices)
  ];
  sequence_s.push(lastHandle,B);
  sequence_v.push(lastHandle,B);

  PATH.setAttributeNS(null, 'd', sequence_s.join(' '));
  VIZ.setAttributeNS(null, 'd', sequence_v.join(' '));
}
drawPegs();


// interactions
const controls = document.querySelectorAll('input[type=range]');
for(let i=0; i<controls.length; i++){
  controls[i].oninput = function(){
    eval(this.id + ' = ' + this.value);
    drawPegs();
  }
}

DEMO.onmousemove = function(event){
  B = [event.pageX, event.pageY];
  drawPegs();
}

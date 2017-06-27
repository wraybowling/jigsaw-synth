'use strict';

// utilities
function lerp(a, b, t){
  return (1 - t) * a + t * b;
}

function lerpVec(a, b, t){
  return [
    lerp(a[0], b[0], t),
    lerp(a[1], b[1], t)
  ]
}

// DOM
const PATH = document.getElementById('squiggle');
const VIZ = document.getElementById('visualization');

const DEMO = document.getElementById('demo');
const WOGGLE = 30;
const OFFSET_BASE = 1.5;
const SCURVE_BASE = 0.2;

// Coordinates
var A = [100, 100];
var I = [500, 300];

function draw(){
  let length = Math.sqrt(Math.pow(A[0]-I[0],2) + Math.pow(A[1]-I[1],2));

  let slices = Math.ceil(length / controls.tabWidth);

  let theta = Math.atan2(I[0] - A[0], I[1] - A[1]);

  let slopeY = Math.sin(theta);
  let slopeX = Math.cos(theta);

  // generate tabs and blanks
  //
  //         f-F-g
  //         \   G
  // Aa-b-B-c E h-H---iI
  //       C   \
  //       d-D-e
  //
  // A: Start anchor: handle points to I at half of lead length
  // B: Lead node: provides offset from anchor to tabs: handle uses overshoot
  // C: Side roundness node: ensures fairness: handle uses overshoot
  // D: Tab roundless node: handle uses overshoot
  // E: Side roundness node: reinforces S fairness: handles use overshoot and independent length based on offset
  // F: same as D
  // G: same as C
  // H: same as B
  // I: End anchor: handle points to A at half of lead length
  //

  // Sequences preloaded with Node A
  var sequence_s = ['M', A, 'C'];
  var sequence_v = ['M', A, 'L'];

  let a = lerpVec(A,I, controls.lead*0.25);
  let b = lerpVec(A,I, controls.lead*0.75);
  let B = lerpVec(A,I, controls.lead);
 
  let d = lerpVec(A,I, controls.lead*1.25);
  let D = [
    lerp(A[0], I[0], 1/slices * controls.overshoot),
    lerp(A[1], I[1], 1/slices * controls.overshoot) + controls.offset
  ];
  sequence_s.push(a,b,B,d,D);
  sequence_v.push(a,b,B,d,D);

  let flipflop = 1;
  
  /*
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

    let offsetX = flipflop * slopeX * offset * mult;// / slices;
    let offsetY = flipflop * slopeY * offset * mult;// / slices;

    // leading up to anchor
    let handle = [
      lerp(A.x,B.x,t-overshoot*mult/slices) + offsetX + Math.random()*woggle-woggle/2,
      lerp(A.y,B.y,t-overshoot*mult/slices) - offsetY + Math.random()*woggle-woggle/2
    ];
    sequence_s.push(handle);
    sequence_v.push(handle);
    // anchor
    let anchor = [
      lerp(A.x,B.x,t) + offsetX + Math.random()*woggle-woggle/2,
      lerp(A.y,B.y,t) - offsetY + Math.random()*woggle-woggle/2
    ];
    sequence_s.push(anchor);
    sequence_v.push(anchor);
    console.log('slices',slices);

    if(slices === 2){
      let secondLastHandle = [
        lerp(A.x,B.x,(slices-1)/slices+overshoot*mult/slices) + offsetX + Math.random()*woggle-woggle/2,
        lerp(A.y,B.y,(slices-1)/slices+overshoot*mult/slices) - offsetY + Math.random()*woggle-woggle/2
      ];
      sequence_s.push(secondLastHandle);
      sequence_v.push(secondLastHandle);
    }
  }
  console.groupEnd();
*/
  let anchorG = [
    lerp(A[0],I[0],(slices-controls.overshoot)/slices),
    lerp(A[1],I[1],(slices-controls.overshoot)/slices)
  ];

  // handle H and anchor B
  let anchorH = [
    lerp(A[0],B[0], 1-controls.lead/2),
    lerp(A[1],B[1], 1-controls.lead/2)
  ];
  sequence_s.push(anchorH, I);
  sequence_v.push(anchorH, I);

  // combine arrays into svg path data
  PATH.setAttributeNS(null, 'd', sequence_s.join(' '));
  VIZ.setAttributeNS(null, 'd', sequence_v.join(' '));
}
draw();


// interactions

DEMO.onmousemove = function(event) {
  I = [event.pageX, event.pageY];
  draw();
}

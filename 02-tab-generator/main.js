// generate tabs and blanks
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
//         f-F-g
//         \   G
// Aa-b-B-c E h-H---iI
//       C   \
//       d-D-e
//

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

// Coordinates
let A = [100, 100];
let I = [500, 300];

function draw(){
  let B = lerpVec(A,I, controls.lead);
  let H = lerpVec(A,I, 1-controls.lead );

  let a = lerpVec(A,B, 0.25);
  let b = lerpVec(A,B, 0.75);
  let h = lerpVec(H,I, -0.25);
  let i = lerpVec(H,I, 0.75);

  // let d = lerpVec(A,I, controls.lead*1.25);
  // let D = [
  //   lerp(A[0], I[0], 1/slices * controls.overshoot),
  //   lerp(A[1], I[1], 1/slices * controls.overshoot) + controls.offset
  // ];

  let sequenceC = ['M', A, 'L', a, b,B];
  let sequenceL = ['M', A, 'L', a, b,B];

  console.group('loop');
  let flipflop = 1;
  let length = Math.sqrt(Math.pow(B[0]-H[0],2) + Math.pow(B[1]-H[1],2));
  let slices = Math.ceil(length / controls.tabWidth);
  let theta = Math.atan2(H[0] - B[0], H[1] - B[1]);
  let slopeY = Math.sin(theta);
  let slopeX = Math.cos(theta);
  for(let i=1; i<slices; i++){

    if(i===2) sequenceC.push('S');
    let t = i/slices;

    // flip flop
    flipflop *= -1;

    let mult = 1 - Math.random() * controls.wiggle;

    let offsetX = flipflop * slopeX * controls.offset * mult;// / slices;
    let offsetY = flipflop * slopeY * controls.offset * mult;// / slices;

    // leading up to anchor
    let handle = [
      lerp(B[0],H[0],t-controls.overshoot*mult/slices) + offsetX + Math.random()*controls.woggle-controls.woggle/2,
      lerp(B[0],H[1],t-controls.overshoot*mult/slices) - offsetY + Math.random()*controls.woggle-controls.woggle/2
    ];
    sequenceC.push(handle);
    sequenceL.push(handle);
    // anchor
    let anchor = [
      lerp(B[0],H[0],t) + offsetX + Math.random()*controls.woggle-controls.woggle/2,
      lerp(B[1],H[1],t) - offsetY + Math.random()*controls.woggle-controls.woggle/2
    ];
    sequenceC.push(anchor);
    sequenceL.push(anchor);
    console.log('slices',slices);

    // if(slices === 2){
    //   let secondLastHandle = [
    //     lerp(B[0],H[0],(slices-1)/slices+controls.overshoot*mult/slices) + offsetX + Math.random()*controls.woggle-controls.woggle/2,
    //     lerp(B[1],H[1],(slices-1)/slices+controls.overshoot*mult/slices) - offsetY + Math.random()*controls.woggle-controls.woggle/2
    //   ];
    //   sequenceC.push(secondLastHandle);
    //   sequenceL.push(secondLastHandle);
    // }
  }
  console.groupEnd();

  // combine arrays into svg path data
  sequenceC.push(h,H, i,I);
  sequenceL.push(h,H, i,I);
  PATH.setAttributeNS(null, 'd', sequenceC.join(' '));
  VIZ.setAttributeNS(null, 'd', sequenceL.join(' '));
}
draw();

// interactions
DEMO.onmousemove = function(event) {
  I = [event.pageX, event.pageY];
  draw();
}

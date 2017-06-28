function drawTabs(p1,p2){

  let A = [p1.x,p1.y];
  let B = [p2.x,p2.y];

  const boundsThereshold = 0.1;

  if (
    (Math.abs(p1.x - BOUNDS.xl) < boundsThereshold && Math.abs(p2.x - BOUNDS.xl) < boundsThereshold) ||
    (Math.abs(p1.x - BOUNDS.xr) < boundsThereshold && Math.abs(p2.x - BOUNDS.xr) < boundsThereshold) ||
    (Math.abs(p1.y - BOUNDS.yt) < boundsThereshold && Math.abs(p2.y - BOUNDS.yt) < boundsThereshold) ||
    (Math.abs(p1.y - BOUNDS.yb) < boundsThereshold && Math.abs(p2.y - BOUNDS.yb) < boundsThereshold)
  ) {
    return '';
  }

  let length = Math.sqrt(Math.pow(A[0]-B[0],2) + Math.pow(A[1]-B[1],2));

  let slices = Math.ceil(length / controls.tabWidth);

  let theta = Math.atan2(B[0] - A[0], B[1] - A[1]);

  let slope_y = Math.sin(theta);
  let slope_x = Math.cos(theta);

  // set the start point
  // draw the first handle manually
  var sequence_s = ['M',A,'C'];
  var sequence_v = ['M',A,'L'];
  var flipflop = 1; //Math.random() > 0.5 ? -1 : 1;

  let firstHandle = [
    lerp(A[0],B[0],1/slices*controls.overshoot),
    lerp(A[1],B[1],1/slices*controls.overshoot)
  ];
  sequence_s.push(firstHandle);


  // generate tabs and blanks

  for(let i=1; i<slices; i++){

    if(i===2) sequence_s.push('S');
    let t = i/slices;

    t = t * (1-controls.lead) + (controls.lead)/2;

    // flip flop
    flipflop *= -1;

    let taper = Math.cos((t+0.5)*Math.PI*2) / 2 + 0.5;

    let mult = (1 - Math.random() * controls.wiggle) * taper*controls.taper + (1-controls.taper)*(1 - Math.random() * controls.wiggle);

    let offsetX = flipflop * slope_x * controls.offset * mult;// / slices;
    let offsetY = flipflop * slope_y * controls.offset * mult;// / slices;

    // leading up to anchor
    let handle = [
      lerp(A[0],B[0],t-controls.overshoot*mult/slices) + offsetX + (Math.random()*controls.woggle-controls.woggle/2) * taper*controls.taper,
      lerp(A[1],B[1],t-controls.overshoot*mult/slices) - offsetY + (Math.random()*controls.woggle-controls.woggle/2) * taper*controls.taper
    ];
    sequence_s.push(handle);

    // anchor
    let anchor = [
      lerp(A[0],B[0],t) + offsetX + Math.random()*controls.woggle-controls.woggle/2,
      lerp(A[1],B[1],t) - offsetY + Math.random()*controls.woggle-controls.woggle/2
    ];
    sequence_s.push(anchor);

    if(slices === 2){
      let secondLastHandle = [
        lerp(A[0],B[0],(slices-1)/slices+controls.overshoot*mult/slices) + offsetX + Math.random()*controls.woggle-controls.woggle/2,
        lerp(A[1],B[1],(slices-1)/slices+controls.overshoot*mult/slices) - offsetY + Math.random()*controls.woggle-controls.woggle/2
      ];
      sequence_s.push(secondLastHandle);

    }
  }

  let lastHandle = [
    lerp(A[0],B[0],(slices-controls.overshoot)/slices),
    lerp(A[1],B[1],(slices-controls.overshoot)/slices)
  ];
  sequence_s.push(lastHandle,B);

  return sequence_s.join(' ');
}

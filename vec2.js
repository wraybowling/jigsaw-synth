class Vec2 {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
  }

  randomize(){
    //console.log('the controls obj is', controls);
    this.x = Math.sin(this.originX / 0.01 / controls.randomSize + controls.randomSeed)
           * Math.sin(this.originX / 0.7 / controls.randomSize + controls.randomSeed)
           * Math.sin(this.originY / 0.02 / controls.randomSize + controls.randomSeed)
           * Math.sin(this.originY / 0.3 / controls.randomSize + controls.randomSeed)
           * controls.randomSize * controls.randomSize
           + this.originX;
    this.y = Math.sin(this.originX / 0.02 / controls.randomSize + controls.randomSeed)
           * Math.sin(this.originX / 0.5 / controls.randomSize + controls.randomSeed)
           * Math.sin(this.originY / 0.045 / controls.randomSize + controls.randomSeed)
           * Math.sin(this.originY / 0.6 / controls.randomSize + controls.randomSeed)
           * controls.randomSize * controls.randomSize
           + this.originY;
  }
}


// utilities to be refactored
function lerp(a, b, t){
  return (1 - t) * a + t * b;
}

function lerpVec (
  vA = new Vec2(0,0),
  vB = new Vec2(0,0),
  t = 0.5
) {
  return new Vec2 (
    lerp(vA.x, vB.x, t),
    lerp(vA.y, vB.y, t)
  );
}

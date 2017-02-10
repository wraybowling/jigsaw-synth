class Vec2 {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
  }

  randomize(){
    this.x = Math.sin(this.originX / 3.1)
           * Math.sin(this.originY / 41.2)
           * controls.voronoise
           + this.originX;
    this.y = Math.sin(this.originX / 5.3)
           * Math.sin(this.originY / 61.4)
           * controls.voronoise
           + this.originY;
  }
}

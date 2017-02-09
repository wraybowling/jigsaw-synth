class Vec2 {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
  }

  get(){
    this.x = sin(this.originX / 3.0)
           * sin(this.originY / 4.0)
           * voronoise;
    this.y = sin(this.originX / 5.0)
           * sin(this.originY / 6.0)
           * voronoise;
    return this;
  }
}

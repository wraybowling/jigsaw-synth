class Vec2 {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
  }

  randomize(){
    this.x = Math.sin(this.originX / 0.01 / controls.pieceSize + controls.seed)
           * Math.sin(this.originX / 0.7 / controls.pieceSize + controls.seed)
           * Math.sin(this.originY / 0.02 / controls.pieceSize + controls.seed)
           * Math.sin(this.originY / 0.3 / controls.pieceSize + controls.seed)
           * controls.voronoise * controls.pieceSize
           + this.originX;
    this.y = Math.sin(this.originX / 0.02 / controls.pieceSize + controls.seed)
           * Math.sin(this.originX / 0.5 / controls.pieceSize + controls.seed)
           * Math.sin(this.originY / 0.045 / controls.pieceSize + controls.seed)
           * Math.sin(this.originY / 0.6 / controls.pieceSize + controls.seed)
           * controls.voronoise * controls.pieceSize
           + this.originY;
  }
}

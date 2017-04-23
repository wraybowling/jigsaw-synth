// Controllable Parameters
var controls = {};

// Event Handlers
const controlSliders = document.querySelectorAll('input');
for(let i=0; i<controlSliders.length; i++){
  controlSliders[i].oninput = function(){
    controls[this.id] = Number(this.value);
    draw();
  }
  controls[controlSliders[i].id] = Number(controlSliders[i].value);
}

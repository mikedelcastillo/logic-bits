var mouse = {
  x: 0, y: 0, down: false, dragging: false, wasDragging: false, downSelected: null, upSelected: null
};

mouse.mouseDown = function(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.downSelected = null;
  mouse.upSelected = null;
  mouse.down = true;
  mouse.dragging = false;
  mouse.wasDragging = false;
}

mouse.mouseMove = function(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  if(mouse.down) mouse.dragging = true;
}

mouse.mouseUp = function(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.down = false;
  mouse.wasDragging = mouse.dragging;
  mouse.dragging = false;
}

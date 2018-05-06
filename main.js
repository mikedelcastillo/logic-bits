var canvas, ctx, PI = Math.PI, TAU = 2 * PI, keyCode = {}, stats, mods;

function windowLoad(){
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  stats = document.getElementById("stats");
  mods = document.getElementById("mods");

  windowResize();
  window.addEventListener("resize", windowResize, false);

  window.addEventListener("keydown", keyDown, false);
  window.addEventListener("keyup", keyUp, false);

  document.addEventListener("mousedown", mouse.mouseDown, false);
  document.addEventListener("mouseup", mouse.mouseUp, false);
  document.addEventListener("mousemove", mouse.mouseMove, false);

  for(var i in MOD){
    mods.innerHTML += "<a href='javascript: modules.push(new MOD." + i + "());'>" + i + "</a><br/>";
  }

  var m1 = new MOD.AND(200, 100);
  var m2 = new MOD.OR(300, 200);
  var m3 = new MOD.POWER(100, 200);

  modules.push(m1);
  modules.push(m2);
  modules.push(m3);

  update();
}

function update(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = ctx.fillStyle = "#607D8B";
  ctx.lineWidth = IO_STROKE_WIDTH;
  ctx.lineCap = "round";

  for(var i = 0; i < modules.length; i++){
    var m = modules[i];
    m.updateClicks();
    m.updateLogic();
    m.updateIO();
    m.drawIO();
    m.drawModule();
  }

  if(mouse.downSelected instanceof IO && mouse.dragging){
    //ctx.setLineDash([5]);
    ctx.beginPath();
    ctx.moveTo(mouse.downSelected.module.x + mouse.downSelected.x, mouse.downSelected.module.y + mouse.downSelected.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
  }

  time++;
  requestAnimationFrame(update);
}

window.addEventListener("load", windowLoad, false);

function windowResize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function keyDown(e){
  keyCode[e.keyCode] = true;
}

function keyUp(e){
  keyCode[e.keyCode] = false;
}

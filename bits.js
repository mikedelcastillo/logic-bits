var IO_RADIUS = 10;
var IO_STROKE_WIDTH = 3;
var modules = [];
var time = 0;

function Module(x, y){
  this.x = this.x || x || canvas.width/2 || 0;
  this.y = this.y || y || canvas.height/2 || 0;

  this.outputs = this.outputs || [];
  this.inputs = this.inputs || [];
  this.mergedIO = [];

  this.type = this.type || "?";

  this.updateIO = this.updateIO || function(){
    for(var i = 0; i < this.inputs.length; i++){
      var io = this.inputs[i];
      if(io.connectedTo){
        io.connectedTo.connectedTo = io;
        io.powered = io.connectedTo.powered;
      }
      else io.powered = false;
    }
  };

  this.updateClicks = this.updateClicks || function(){
    var dist2 = (this.x - mouse.x) * (this.x - mouse.x) + (this.y - mouse.y) * (this.y - mouse.y);
    if(mouse.down && !mouse.dragging && !mouse.downSelected && dist2 <= IO_RADIUS * IO_RADIUS){
      mouse.downSelected = this;
    }

    if(mouse.downSelected == this && mouse.dragging){
      this.x = mouse.x;
      this.y = mouse.y;
    }

    if(this.outputs.length + this.inputs.length != this.mergedIO.length){
      this.mergedIO = [];
      Array.prototype.push.apply(this.mergedIO, this.outputs);
      Array.prototype.push.apply(this.mergedIO, this.inputs);
    }

    if(!mouse.downSelected || mouse.downSelected instanceof IO){
      for(var i = 0; i < this.mergedIO.length; i++){
        var io = this.mergedIO[i];
        dist2 = (this.x + io.x - mouse.x) * (this.x + io.x - mouse.x) + (this.y + io.y - mouse.y) * (this.y + io.y - mouse.y);
        if(mouse.down && !mouse.dragging && !mouse.downSelected && dist2 <= IO_RADIUS * IO_RADIUS){
          if(io.connectedTo){
            io.connectedTo.connectedTo = null;
          }
          mouse.downSelected = io;
        }

        if(mouse.downSelected && !mouse.upSelected && mouse.wasDragging && !mouse.down && mouse.downSelected.module != this && mouse.downSelected.type != io.type && dist2 <= IO_RADIUS * IO_RADIUS){
          if(io.connectedTo) io.connectedTo.connectedTo = null;
          mouse.upSelected = io;
          mouse.upSelected.connectedTo = mouse.downSelected;
        }

        if(mouse.downSelected == io){
          mouse.downSelected.connectedTo = mouse.upSelected;
        }
      }
    }
  };

  this.updateLogic = this.updateLogic || function(){};

  this.drawIO = this.drawIO || function(){
    for(var i = 0; i < this.mergedIO.length; i++){
      var io = this.mergedIO[i];
      ctx.beginPath();
      //if(io.type) ctx.setLineDash([5]); else ctx.setLineDash(0);
      ctx.arc(this.x + io.x, this.y + io.y, IO_RADIUS, 0, TAU);
      ctx.stroke();
      if(io.powered) ctx.fill();

      if(io.connectedTo){
        //ctx.setLineDash(0);
        ctx.beginPath();
        ctx.moveTo(this.x + io.x, this.y + io.y);
        ctx.lineTo(io.connectedTo.module.x + io.connectedTo.x, io.connectedTo.module.y + io.connectedTo.y);
        ctx.stroke();
      }
    }
  };

  this.drawModule = this.drawModule || function(){
    ctx.textAlign = "center";
    ctx.textBaseline="middle";
    ctx.fillText(this.type, this.x, this.y);
  };
}

function IO(x, y, t, m){
  this.x = this.x || x || 0;
  this.y = this.y || y || 0;

  this.powered = false;

  this.connectedTo = null;

  this.type = t; //1 0

  this.module = m;
}

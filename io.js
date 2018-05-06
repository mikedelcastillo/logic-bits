var MOD = {
  POWER: function(){
    this.type = "POW";

    this.outputs = [
      new IO(0, -30, 0, this)
    ];

    this.updateLogic = function(){
      this.outputs[0].powered = true;
    }

    Module.apply(this, arguments);
  },
  AND: function(){
    this.type = "AND";

    this.outputs = [
      new IO(30, 0, 0, this)
    ];
    this.inputs = [
      new IO(-30, -20, 1, this),
      new IO(-30, 20, 1, this)
    ];

    this.updateLogic = function(){
      this.outputs[0].powered = this.inputs[0].powered && this.inputs[1].powered;
    }

    Module.apply(this, arguments);
  },
  OR: function(){
    this.type = "OR";

    this.outputs = [
      new IO(30, 0, 0, this)
    ];
    this.inputs = [
      new IO(-30, -20, 1, this),
      new IO(-30, 20, 1, this)
    ];

    this.updateLogic = function(){
      this.outputs[0].powered = this.inputs[0].powered || this.inputs[1].powered;
    }

    Module.apply(this, arguments);
  },
  XOR: function(){
    this.type = "XOR";

    this.outputs = [
      new IO(30, 0, 0, this)
    ];
    this.inputs = [
      new IO(-30, -20, 1, this),
      new IO(-30, 20, 1, this)
    ];

    this.updateLogic = function(){
      this.outputs[0].powered = this.inputs[0].powered ^ this.inputs[1].powered;
    }

    Module.apply(this, arguments);
  },
  SPLITTER: function(){
    this.type = "SPL";

    this.outputs = [
      new IO(30, -20, 0, this),
      new IO(30, 20, 0, this)
    ];
    this.inputs = [
      new IO(-30, 0, 1, this)
    ];

    this.updateLogic = function(){
      this.outputs[0].powered = this.inputs[0].powered;
      this.outputs[1].powered = this.inputs[0].powered;
    }

    Module.apply(this, arguments);
  },
  INVERTER: function(){
    this.type = "INV";

    this.outputs = [
      new IO(30, 0, 0, this)
    ];
    this.inputs = [
      new IO(-30, 0, 1, this)
    ];

    this.updateLogic = function(){
      this.outputs[0].powered = !this.inputs[0].powered;
    }

    Module.apply(this, arguments);
  }
};

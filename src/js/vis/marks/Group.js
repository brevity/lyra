vde.Vis.marks.Group = (function() {
  var group = function(name) {
    vde.Vis.Mark.call(this, name || 'group_' + (vg.keys(vde.Vis.groups).length+1));

    this.type   = 'group';
    this.pseudo = false;  // A psuedo-group exists in the spec, but not in the VDE UI.

    this.scales = {};
    this.axes   = {};
    this.marks  = {};

    this._spec.scales = [];
    this._spec.axes   = [];
    this._spec.marks  = [];

    this.properties = {
      x: {value: 0},
      width: {value: vde.Vis.properties.width},
      y: {value: 0},
      height: {value: vde.Vis.properties.height},
      fill: {value: '#ffffff'},
      fillOpacity: {value: 1},
      stroke: {value: '#000000'},
      strokeWidth: {value: 0}
    };

    vde.Vis.groups[this.name] = this;

    return this;
  };

  group.prototype = new vde.Vis.Mark();
  var prototype = group.prototype;

  prototype.spec = function() {
    var self = this;
    var spec = vg.duplicate(vde.Vis.Mark.prototype.spec.call(this));

    vg.keys(this.scales).forEach(function(k) { spec.scales.push(self.scales[k].spec()); });
    vg.keys(this.axes).forEach(function(k)   { spec.axes.push(self.axes[k].spec()); });
    vg.keys(this.marks).forEach(function(k)  { spec.marks.push(self.marks[k].spec()); });

    return spec;
  };

  // Given a spec, find a pre-existing scale that matches,
  // or if none do, build a new scale. 
  prototype.scale = function(spec, defaultSpec) {
    for(var scaleName in this.scales) {
      if(this.scales[scaleName].equals(spec))
        return this.scales[scaleName];
    }

    for(var k in defaultSpec)
      spec[k] = defaultSpec[k];

    return new vde.Vis.Scale('', this, spec);
  };

  return group;
})();
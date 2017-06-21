import Ember from 'ember';
import d3Selection from 'npm:d3-selection';
import d3Scale from 'npm:d3-scale';

const SVG_SELECTOR = '#rootSVG';

export default Ember.Controller.extend({
  svgWidth: 1280,
  svgHeight: 600,

  currentMax: 0,
  realMax: 11,
  baseW: 80,
  heightFactor: 0,
  lean: 0,
  
  init: function () {
    Ember.run.schedule("afterRender", this, function() {
      d3Selection.select(SVG_SELECTOR).on("mousemove", this.onMouseMove.bind(this));
      this.next();
    });
  },

  next() {
    const currentMax = this.get('currentMax');

    if (currentMax < this.get('realMax')) {
        this.set('currentMax', currentMax + 1);
        setTimeout(this.next.bind(this), 500);
    }
  },

  onMouseMove() {
// debugger;
    const svg = Ember.$(SVG_SELECTOR);
    const [x, y] = d3Selection.mouse(svg[0]);

    const scaleFactor = d3Scale.scaleLinear().domain([this.get('svgHeight'), 0])
                                      .range([0, .8])

    const svgWidth = this.get('svgWidth');

    const scaleLean = d3Scale.scaleLinear().domain([0, svgWidth/2, svgWidth])
                                    .range([.5, 0, -.5]);

    this.set('heightFactor', scaleFactor(y));
    this.set('lean', scaleLean(x));                         
  },


  xPos: Ember.computed('svgWidth', function() {
    return this.get('svgWidth')/2 - 40;
  }),

  yPos: Ember.computed('svgHeight', 'baseW', function() {
    return this.get('svgHeight') - this.get('baseW');
  })

});

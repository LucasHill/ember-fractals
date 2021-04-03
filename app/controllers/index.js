import { computed } from '@ember/object';
import { schedule } from '@ember/runloop';
import Controller from '@ember/controller';
import d3Selection from 'd3-selection';
import d3Scale from 'd3-scale';

const SVG_SELECTOR = '#rootSVG';

export default Controller.extend({
  svgWidth: 1280,
  svgHeight: 600,

  currentMax: 0,
  realMax: 11,
  baseW: 80,
  heightFactor: 0,
  lean: 0,
  
  init: function () {
    this._super(...arguments);
    schedule("afterRender", this, function() {
      d3Selection.select(SVG_SELECTOR).on("mousemove", this.onMouseMove.bind(this));
      this.next();
    });
  },

  next() {
    const currentMax = this.currentMax;

    if (currentMax < this.realMax) {
        this.set('currentMax', currentMax + 1);
        setTimeout(this.next.bind(this), 500);
    }
  },

  onMouseMove() {
    const svg = document.querySelectorAll(SVG_SELECTOR);
    const [x, y] = d3Selection.mouse(svg[0]);

    const scaleFactor = d3Scale.scaleLinear().domain([this.svgHeight, 0])
                                      .range([0, .8])

    const svgWidth = this.svgWidth;

    const scaleLean = d3Scale.scaleLinear().domain([0, svgWidth/2, svgWidth])
                                    .range([.5, 0, -.5]);

    this.set('heightFactor', scaleFactor(y));
    this.set('lean', scaleLean(x));                         
  },


  xPos: computed('svgWidth', function() {
    return this.svgWidth/2 - 40;
  }),

  yPos: computed('svgHeight', 'baseW', function() {
    return this.svgHeight - this.baseW;
  })

});

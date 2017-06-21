import Ember from 'ember';
import memoizedCalc from 'ember-fractals/utils/memoized-calc';
import d3Scale from 'npm:d3-scale';

export default Ember.Component.extend({
  tagName: '',

  w: null,
  x: null,
  y: null,
  heightFactor: null,
  lean: null,
  left: null,
  right: null,
  lvl: null,
  plusLvl: Ember.computed('lvl', function() {
    return this.get('lvl') + 1;
  }),
  maxlvl: null,

  nextRight: null,
  nextYRight: Ember.computed('nextRight', function() {
    return -this.get('nextRight');
  }),
  nextYLeft: Ember.computed('nextLeft', function() {
    return -this.get('nextLeft');
  }),
  nextXRight: Ember.computed('nextRight', 'w', function() {
    return this.get('w') - this.get('nextRight');
  }),
  nextLeft: null,
  aRotation: null,
  bRotation: null,

  didReceiveAttrs() { 
    const { nextRight, nextLeft, aRotation, bRotation } = memoizedCalc({
        w: this.get('w'),
        heightFactor: this.get('heightFactor'),
        lean: this.get('lean')
    });

    this.set('nextRight', nextRight);
    this.set('nextLeft', nextLeft);
    this.set('aRotation', aRotation);
    this.set('bRotation', bRotation);
  },

  fill: Ember.computed('lvl', 'maxlvl', function() {
    return d3Scale.interpolateViridis(this.get('lvl')/this.get('maxlvl'));
  }),

  rotate: Ember.computed('aRotation', 'bRotation', 'left', 'right', 'w', function() {
    const w = this.get('w');
    if (this.get('left')) {
      return `rotate(${-this.get('aRotation')} 0 ${w})`;
    }else if (this.get('right')) {
      return `rotate(${this.get('bRotation')} ${w} ${w})`;
    }
  }),

  shouldRecurse: Ember.computed('lvl', 'maxlvl', 'w', function() {
    if (this.get('lvl') >= this.get('maxlvl') || this.get('w') < 1) {
      return false;
    }
    return true;
  })
});

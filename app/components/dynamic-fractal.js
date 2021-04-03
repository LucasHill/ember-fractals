import { computed } from '@ember/object';
import Component from '@ember/component';
import memoizedCalc from 'ember-fractals/utils/memoized-calc';
import d3Scale from 'd3-scale';

export default Component.extend({
  tagName: '',

  w: null,
  x: null,
  y: null,
  heightFactor: null,
  lean: null,
  left: null,
  right: null,
  lvl: null,
  plusLvl: computed('lvl', function () {
    return this.lvl + 1;
  }),
  maxlvl: null,

  nextRight: null,
  nextYRight: computed('nextRight', function () {
    return -this.nextRight;
  }),
  nextYLeft: computed('nextLeft', function () {
    return -this.nextLeft;
  }),
  nextXRight: computed('nextRight', 'w', function () {
    return this.w - this.nextRight;
  }),
  nextLeft: null,
  aRotation: null,
  bRotation: null,

  didReceiveAttrs() {
    this._super();
    const { nextRight, nextLeft, aRotation, bRotation } = memoizedCalc({
      w: this.w,
      heightFactor: this.heightFactor,
      lean: this.lean,
    });

    this.set('nextRight', nextRight);
    this.set('nextLeft', nextLeft);
    this.set('aRotation', aRotation);
    this.set('bRotation', bRotation);
  },

  fill: computed('lvl', 'maxlvl', function () {
    return d3Scale.interpolateViridis(this.lvl / this.maxlvl);
  }),

  rotate: computed('aRotation', 'bRotation', 'left', 'right', 'w', function () {
    const w = this.w;
    if (this.left) {
      return `rotate(${-this.aRotation} 0 ${w})`;
    } else if (this.right) {
      return `rotate(${this.bRotation} ${w} ${w})`;
    }
  }),

  shouldRecurse: computed('lvl', 'maxlvl', 'w', function () {
    if (this.lvl >= this.maxlvl || this.w < 1) {
      return false;
    }
    return true;
  }),
});

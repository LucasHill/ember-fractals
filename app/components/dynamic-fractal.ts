import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import memoizedCalc from 'ember-fractals/utils/memoized-calc';
import d3Scale from 'd3-scale';

interface DynamicFractalsArgs {
  w: number;
  h: number;
  heightFactor: number;
  lean: number;
  x: number;
  y: number;
  lvl: number;
  maxlvl: number;
  left: boolean;
  right: boolean;
}

export default class DynamicFractals extends Component<DynamicFractalsArgs> {
  get plusLvl(): number {
    return this.args.lvl + 1;
  }

  get nextRight(): number {
    const { nextRight } = memoizedCalc({
      w: this.args.w,
      heightFactor: this.args.heightFactor,
      lean: this.args.lean,
    });

    return nextRight;
  }

  get nextYRight(): number {
    return -this.nextRight;
  }

  get nextLeft(): number {
    const { nextLeft } = memoizedCalc({
      w: this.args.w,
      heightFactor: this.args.heightFactor,
      lean: this.args.lean,
    });

    return nextLeft;
  }

  get nextYLeft(): number {
    return -this.nextLeft;
  }

  get nextXRight(): number {
    return this.args.w - this.nextRight;
  }

  get aRotation(): number {
    const { aRotation } = memoizedCalc({
      w: this.args.w,
      heightFactor: this.args.heightFactor,
      lean: this.args.lean,
    });

    return aRotation;
  }

  get bRotation(): number {
    const { bRotation } = memoizedCalc({
      w: this.args.w,
      heightFactor: this.args.heightFactor,
      lean: this.args.lean,
    });

    return bRotation;
  }

  get fill(): string {
    return d3Scale.interpolateViridis(this.args.lvl / this.args.maxlvl);
  }

  get rotate(): string | undefined {
    const w = this.args.w;
    if (this.args.left) {
      return `rotate(${-this.aRotation} 0 ${w})`;
    } else if (this.args.right) {
      return `rotate(${this.bRotation} ${w} ${w})`;
    }
    return;
  }

  get shouldRecurse(): boolean {
    if (this.args.lvl >= this.args.maxlvl || this.args.w < 1) {
      return false;
    }
    return true;
  }
}

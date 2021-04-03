function rad2Deg(radians) {
  return radians * (180 / Math.PI);
}

const memoizedCalc = (function () {
  const memo = {};

  const key = ({ w, heightFactor, lean }) => [w, heightFactor, lean].join('-');

  return (args) => {
    const memoKey = key(args);

    if (memo[memoKey]) {
      return memo[memoKey];
    } else {
      const { w, heightFactor, lean } = args;

      const trigH = heightFactor * w;

      const result = {
        nextRight: Math.sqrt(trigH ** 2 + (w * (0.5 + lean)) ** 2),
        nextLeft: Math.sqrt(trigH ** 2 + (w * (0.5 - lean)) ** 2),
        aRotation: rad2Deg(Math.atan(trigH / ((0.5 - lean) * w))),
        bRotation: rad2Deg(Math.atan(trigH / ((0.5 + lean) * w))),
      };

      memo[memoKey] = result;
      return result;
    }
  };
})();

export default memoizedCalc;

export function groupInMeasures(part) {
  let total = 0;
  const output = part.reduce((memo, item, chordIndex) => {
    const duration = frac(item.duration);
    total += duration;
    if (total > 1) {
      total = duration;
      return [...memo, [{ ...item, chordIndex }]];
    }
    const start = memo.slice(0, -1);
    const last = memo.at(-1) || [];
    return [...start, [...last, { ...item, chordIndex }]];
  }, []);
  return output;
}

export function fractionToAbc(x) {
  return {
    "1/8": 8,
    "1/4": 4,
    "1/2": 2,
    "1": 1
  }[x];
}

export function frac(x) {
  if (+x === 1) {
    return 1;
  }
  try {
    const [num, den] = x.split("/");
    return num / den;
  } catch (error) {
    throw new Error(`${x} is not a computable fraction`);
  }
}

export function fractionToSixteenths(x) {
  return {
    "1/8": 2,
    "1/4": 4,
    "1/2": 8,
    "1": 16
  }[x];
}

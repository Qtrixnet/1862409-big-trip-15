export const countMoney = (points, types) => {
  const summOfTypes = types.map((type) => {
    let typeSumm = 0;
    points.forEach((point) => {
      if (point.type === type.toLowerCase()) {
        typeSumm += point.price;
      }
    });
    return typeSumm;
  });
  return summOfTypes;
};

export const countsTypes = (points, types) => {
  const countOfTypes = types.map((type) => {
    let typeCount = 0;
    points.forEach((point) => {
      if (point.type === type.toLowerCase()) {
        typeCount += 1;
      }
    });
    return typeCount;
  });
  return countOfTypes;
};

export const countsTime = (points, types) => {
  const timeSpendCount = types.map((type) => {
    let time = 0;
    points.forEach((point) => {
      if (point.type === type.toLowerCase()) {
        time += point.duration;
      }
    });
    return time;
  });
  return timeSpendCount;
};

export const uniqTypes = (points) => {
  const unique = (arr) => {
    const result = [];
    for (const str of arr) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }
    return result;
  };
  const allTypes = points.map((point) => point.type.toUpperCase());
  return unique(allTypes).sort();
};

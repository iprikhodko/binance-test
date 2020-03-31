import BigNumber from 'bignumber.js';

export const getFormattedNumber = (num: string | number) => {
  if (new BigNumber(num).isNaN()) {
    return '';
  }

  const preparedNum = num.toString();
  const [integers, fractional = ''] = preparedNum.split('.');
  const digitsArr = integers.split('').reverse();
  const formattedInt = digitsArr.reduce((result, digit, index) => {
    if (index !== 0 && index % 3 === 0) {
      return [

        ...result,
        ',',
        digit,
      ];
    }

    return [
      ...result,
      digit,
    ];
  }, [] as string[]).reverse().join('');

  return `${formattedInt}${fractional ? '.' : ''}${fractional}`;
};

export const getSortNumbersFn = (sortOrder: 1 | -1) => (v1: BigNumber.Value, v2: BigNumber.Value) => {
  const preparedValue1 = new BigNumber(v1);
  const preparedValue2 = new BigNumber(v2);

  return preparedValue1.minus(preparedValue2).toNumber() * sortOrder;
};

export const getSortStrings = (sortOrder: 1 | -1) => (v1: string, v2: string) => {
  let result: number = 0;

  if (v1 < v2) {
    result = -1;
  } else if (v1 > v2) {
    result = 1;
  }

  return result * sortOrder;
};

export const loadLocalStorage = <T>(fieldName: string, defaultValue: any): T => {
  let data;

  try {
    data = JSON.parse(localStorage.getItem(fieldName) || '');
  } catch (e) {
    return defaultValue;
  }

  return data || defaultValue;
};

export const saveLocalStorage = (fieldName: string, data: any) => {
  try {
    localStorage.setItem(fieldName, JSON.stringify(data));
  } catch (e) {
    // log error
  }
};

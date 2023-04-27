export const isUndefindOrNull = (value: any): boolean => {
  return typeof value === 'undefined' || value === null;
};

export const isEmptyString = (value: any): boolean => {
  return String(value) === '';
};

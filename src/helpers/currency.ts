export const formatCurrency = (value: string): string => {
  const cleanValue = value.replace(/[.,]/g, '');

  const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return formattedValue;
};

export const stringToNumberCurrency = (value: string): number => {
  const stringWithoutDots = value.replace(/\./g, '');

  const numberValue = parseInt(stringWithoutDots, 10);
  return numberValue;
};

export const standartCurrency = (value: any): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'IDR'
  }).format(value);
};

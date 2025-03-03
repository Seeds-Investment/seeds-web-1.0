export const formatCurrency = (
  price: number,
  decimalPlaces?: number
): string => {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'IDR',
    currencyDisplay: 'symbol',
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  };

  return new Intl.NumberFormat('id-ID', options).format(price);
};

export const formatCurrency = (price: number) =>
  new Intl.NumberFormat('id-ID', {
    currency: 'IDR'
  }).format(price);

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

export const formatDate = (date: Date) => {
  date = new Date(date);

  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${String(day).padStart(2, '0')}/${String(month).padStart(
    2,
    '0',
  )}/${year} ${hours}h:${minutes}m`;
};

export const formatNumber = (number: number) => Number(number.toFixed(2));

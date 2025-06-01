export const centToDollar = (cents?: number): string => {
  if (!cents) return '';

  return (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

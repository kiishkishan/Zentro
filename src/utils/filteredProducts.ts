// utils/filterValidProducts.ts
export const isValidImage = (url: string | null | undefined): boolean => {
  if (!url) return false;

  const invalidPatterns = ['placeimg.com', 'placehold', 'undefined', 'null'];

  return url.startsWith('http') && !invalidPatterns.some(p => url.includes(p));
};

export const filterValidProducts = (products: any[] = []) => {
  return products.filter(item => {
    const images = Array.isArray(item.images) ? item.images : [item.image];
    return images.some(isValidImage);
  });
};

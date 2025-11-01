// utils/filterValidProducts.ts
export const isValidImage = (url: string | null | undefined): boolean => {
  if (!url) return false;

  const invalidPatterns = ['placeimg.com', 'placehold', 'undefined', 'null'];

  return url.startsWith('http') && !invalidPatterns.some(p => url.includes(p));
};

export const isValidTitle = (title: string | null | undefined): boolean => {
  if (!title) return false;

  // regex pattern to detect 3 or more consecutive identical characters - eg "aaa", "111", and etc.
  const invalidPattern = /(.)\1{2,}/i;
  return !invalidPattern.test(title);
};

export const filterValidProducts = (products: any[] = []) => {
  return products.filter(item => {
    const images = Array.isArray(item.images) ? item.images : [item.image];
    const hasValidImages = images.some(isValidImage);
    const hasValidTitle = item.title && isValidTitle(item.title);

    return hasValidImages && hasValidTitle;
  });
};

export const getSmallImageUrl = (path: string) => {
  return `https://image.tmdb.org/t/p/w300${path}`;
};

export const getWideImageUrl = (path: string) => {
  return `https://image.tmdb.org/t/p/original${path}`;
};

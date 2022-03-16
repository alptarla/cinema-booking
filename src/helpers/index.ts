function getSmallImageUrl(path: string) {
  return `https://image.tmdb.org/t/p/w300${path}`;
}

function getWideImageUrl(path: string) {
  return `https://image.tmdb.org/t/p/original${path}`;
}

export { getSmallImageUrl, getWideImageUrl };

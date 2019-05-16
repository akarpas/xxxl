const defaultWishes = require('../data/defaultWishlists.json');
let lastId = defaultWishes.length + 1;

export const apiPost = async (wishlist) => {
  await delay(3000)
  wishlist.id = lastId++;
  return wishlist;
}

export const apiPatch = async (wishlist) => {
  return wishlist;
}

const delay = ms => new Promise(res => setTimeout(res, ms))

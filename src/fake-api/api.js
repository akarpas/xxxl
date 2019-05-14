export const apiPost = async (wishlists) => {
  await delay(3000)
  const index = wishlists.findIndex(wishlist => wishlist.id === -1);
  const id = wishlists.length
  wishlists[index].id = id;
  return [...wishlists]
}

export const apiPatch = async (wishlists, wishListName) => {
  await delay(3000)
  const id = wishlists.length
  const index = wishlists.findIndex(wishlist => wishlist.id === id);
  wishlists[index].name = wishListName;
  return [...wishlists];
}

const delay = ms => new Promise(res => setTimeout(res, ms))

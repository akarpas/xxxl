import React from 'react';

const Wishlists = props => {
  const { wishlists } = props;
  return (
    <ul>
      {wishlists.filter(wishlist => wishlist.id !== -1).map(wishlist => {
        return <li key={wishlist.id}>{wishlist.name}</li>
      })}
    </ul>
  )
}

export default Wishlists;
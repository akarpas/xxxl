import React, { useState, useEffect } from 'react';
import DefaultWishlists from './data/defaultWishlists.json';
import { apiPost, apiPatch } from './fake-api/api';
import Wishlists from './Wishlists';
import './App.css';


const App = () => {
  const [wishListName, setWishListName] = useState(null);
  const [wishlists, setWishlists] = useState(DefaultWishlists);

  const onChange = event => {
    setWishListName(event.target.value);
  }

  const addWishlist = async event => {
    event.preventDefault();
    const pendingRequest = wishlists.findIndex(wishlist => wishlist.id === -1) !== -1;

    if (pendingRequest) {
      const data = await apiPatch([...wishlists], wishListName);
      setWishlists(data);
    } else {
      const newWishlists = [...wishlists];
      newWishlists.push({ id: -1, name: wishListName, products: [] })
      setWishlists([...newWishlists]);
      const data = await apiPost([...newWishlists]);
      setWishlists(data);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>XXXL Wishlist</h1>
        <h3>Your Wishlists:</h3>
        <Wishlists wishlists={wishlists} />
        <form onSubmit={addWishlist}>
          <input type="text" minLength="2" onChange={onChange} />
          <button type="submit"> Add Wishlist </button>
        </form>
      </header>
    </div>
  );
}

export default App;

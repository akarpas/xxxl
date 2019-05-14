import React, { useState } from 'react';
import DefaultWishlists from './data/defaultWishlists.json';
import './App.css';


const App = () => {
  const [wishlists, setWishlists] = useState(DefaultWishlists)

  const addWishlist = () => {

  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>XXXL Wishlist</h1>
        <h3>Your Wishlists:</h3>
        <ul>
          {wishlists.map(wishlist => <li key={wishlist.id}>{wishlist.name}</li>)}
        </ul>
        <form onSubmit={addWishlist}>
          <input type="text" min="2" />
          <button type="submit"> Add Wishlist </button>
        </form>
      </header>
    </div>
  );
}

export default App;

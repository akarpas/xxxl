import React, { useState } from 'react';
import DefaultWishlists from './data/defaultWishlists.json';
import { apiPost, apiPatch } from './fake-api/api';
import Wishlists from './Wishlists';
import './App.css';


const App = () => {
  const [wishlistName, setWishlistName] = useState('');
  const [wishlists, setWishlists] = useState(DefaultWishlists);
  const [loading, setLoading] = useState(false);

  const onChange = event => {
    setWishlistName(event.target.value);
  }

  const addWishlist = async event => {
    event.preventDefault();
    const newWishlists = [...wishlists];
    const pendingRequest = wishlists.findIndex(wishlist => wishlist.id === -1) !== -1;
    setLoading(true);

    if (pendingRequest) {
      const index = newWishlists.findIndex(wishlist => wishlist.id === -1);
      newWishlists[index].name = wishlistName;
      setWishlists([...newWishlists]);
      const data = await apiPatch([...newWishlists], wishlistName);
      setWishlists(data);
      setWishlistName('');
      setLoading(false);
    } else {
      newWishlists.push({ id: -1, name: wishlistName, products: [] })
      setWishlists([...newWishlists]);
      const data = await apiPost([...newWishlists]);
      setWishlists(data);
      setWishlistName('');
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>XXXL Wishlist</h1>
        <h3>Your Wishlists:</h3>
        <Wishlists wishlists={wishlists} />
        {loading && <div>- Updating your Wishlists -</div>}
        <form onSubmit={addWishlist}>
          <input value={wishlistName} type="text" minLength="2" onChange={onChange} />
          <button type="submit"> Add Wishlist </button>
        </form>
      </header>
    </div>
  );
}

export default App;

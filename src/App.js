import React, { useState } from 'react';
import DefaultWishlists from './data/defaultWishlists.json';
import { apiPost, apiPatch } from './fake-api/api';

import './App.css';


const App = () => {
  const [pendingId, setPendingId] = useState(-1);
  const [wishlistName, setWishlistName] = useState('');
  const [wishlists, setWishlists] = useState(DefaultWishlists);
  const [loading, setLoading] = useState(false);

  // Handle input of new wishlist name
  const onChange = event => {
    setWishlistName(event.target.value);
  }

  // Function to add the new wishlist to state with negative ID
  const add = event => {
    event.preventDefault();
    const newWishlists = Object.assign(wishlists);
    const wishlist = { id: pendingId, name: wishlistName, products: [] };
    newWishlists.push(wishlist);
    setPendingId(pendingId - 1);
    setWishlists(newWishlists);
    setWishlistName('');
    addOrUpdateWishlist(wishlist, true);
  }

  // PROBLEM (NAIVE SOLUTION)
  // ================================================================
  // const addOrUpdateWishlistWrong = async wishlist => {
  //   if (wishlist.id < 0) {
  //     setLoading(true);
  //     const savedWishlist = await apiPost({...wishlist});
  //     const index = wishlists.findIndex(w => w.id === pendingId);
  //     const updatedWishlists = [...wishlists];
  //     updatedWishlists[index].id = savedWishlist.id;
  //     setWishlists(updatedWishlists);
  //     setLoading(false);
  //   } else {
  //     console.warn('PATCH A SAVED')
  //     await apiPatch(wishlist);
  //   }
  // }


  // Function to add or update a wishlist by calling the API
  const addOrUpdateWishlist = async (wishlist, newList) => {
    // We need to check if there is a pending request from the server
    // in the case there is a pending request, then do a patch instead of a post
    if (wishlist.id < 0 && loading && !newList) {
      console.log('PATCH A POST');
      // NOTE: console.log kept on purpose to show at which cases it is triggered
      await apiPatch(wishlist);
    } else if (wishlist.id < 0) {
      console.log('POST NEW');
      // NOTE: console.log kept on purpose to show at which cases it is triggered

      // Set loading to show on UI that server response is still pending
      // Also to use to check whether someone is editing a wishlist that is still in post
      setLoading(true);
      const savedWishlist = await apiPost({...wishlist});
      const index = wishlists.findIndex(w => w.id === pendingId);
      const updatedWishlists = [...wishlists];
      updatedWishlists[index].id = savedWishlist.id;
      setPendingId(pendingId === -1 ? pendingId : pendingId + 1);
      setWishlists(updatedWishlists);
      setLoading(false);
    } else {
      console.log('PATCH A SAVED');
      // NOTE: console.log kept on purpose to show at which cases it is triggered
      await apiPatch(wishlist);
    }
  }

  // Function to handle changing a wishlist name on the UI
  const handleNameChange = async event => {
    const { id, value } = event.target;
    const updatedWishlists = [...wishlists];
    const indexUpdatedWishlist = updatedWishlists.findIndex(wishlist => wishlist.id === Number(id));
    updatedWishlists[indexUpdatedWishlist].name = value;

    setWishlists(updatedWishlists)
    addOrUpdateWishlist({ id, name: value });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>XXXL Wishlist Manager</h1>
        <h3>Your Wishlists:</h3>
        <ul>
          {wishlists.map(wishlist => {
            return (
              <li key={wishlist.id}>
                <input id={wishlist.id} value={wishlist.name} onChange={handleNameChange} />
              </li>
            )
          })}
        </ul>
        <form className="Form" onSubmit={add}>
          <input value={wishlistName} required type="text" minLength="2" onChange={onChange} />
          <button type="submit"> Add Wishlist </button>
        </form>
        {loading && <div>- Saving your Wishlists -</div>}
      </header>
    </div>
  );
}

export default App;

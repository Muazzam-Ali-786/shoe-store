"use client";

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function UserSync() {
  const { user, token, status } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [isInitialised, setIsInitialised] = useState(false);

  // We should only start syncing AFTER the auth status is 'succeeded'
  // and we've presumably loaded the DB data into Redux.
  useEffect(() => {
    if (status === 'succeeded' && user) {
      // Small delay to ensure DB data has loaded into state before we start monitoring for changes
      const timer = setTimeout(() => setIsInitialised(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsInitialised(false);
    }
  }, [status, user]);

  useEffect(() => {
    // Only sync if logged in and store is initialised with user's DB data
    if (!user || !token || !isInitialised) return;

    const syncData = async () => {
      try {
        await fetch('/api/user/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            cart: cartItems,
            wishlist: wishlistItems
          })
        });
      } catch (error) {
        console.error('Data sync error:', error);
      }
    };

    // Debounce sync to avoid excessive calls
    const timeoutId = setTimeout(syncData, 2000);
    return () => clearTimeout(timeoutId);
  }, [cartItems, wishlistItems, user, token, isInitialised]);

  return null;
}

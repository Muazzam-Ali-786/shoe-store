"use client";
import { Provider } from 'react-redux';
import { store, persistor } from '../lib/store';
import { PersistGate } from 'redux-persist/integration/react';
import UserSync from './component/UserSync';

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UserSync />
        {children}
      </PersistGate>
    </Provider>
  );
}



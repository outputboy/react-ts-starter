import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers';

const persistConfig = {
  storage,
  key: 'root',
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
};

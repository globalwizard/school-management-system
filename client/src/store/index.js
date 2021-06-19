import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers";
import sagas from "./sagas";

const persistConfig = {
  key: "globalStoreData",
  storage,
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  process.env.NODE_ENV !== "production"
    ? composeWithDevTools(applyMiddleware(sagaMiddleware))
    : applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);

let persistor = persistStore(store);

export { store, persistor };

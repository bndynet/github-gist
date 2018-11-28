import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose, Store } from 'redux';
import { routerMiddleware } from 'connected-react-router';

import rootSaga from './saga';
import { createRootReducer } from './reducer';
import history from './history';

const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const appRootReducer = createRootReducer(history);
const appSagaMiddleware = createSagaMiddleware();
const appRouterMiddleware = routerMiddleware(history);

const middlewares = [
  appRouterMiddleware, 
  appSagaMiddleware
];

// Middlewarees only in development
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const store: Store<any, any> = createStore(
    appRootReducer, 
    composeEnhancer(applyMiddleware(...middlewares))
);

// then run the saga
appSagaMiddleware.run(rootSaga);

if (process.env.NODE_ENV === `development`) {
  // Every time the state changes, log it
  // Note that subscribe() returns a function for unregistering the listener
  const unsubscribe: any = store.subscribe(() => console.debug(store.getState()));

  // Stop listening to state updates
  //unsubscribe();
}

export default store;
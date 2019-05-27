import { createMemoryHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import createRootReducer from '../reducers';

export const history = createMemoryHistory();

export const store = createStore(
  createRootReducer(history),
  applyMiddleware(ReduxThunk),
);

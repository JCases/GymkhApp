import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import createRootReducer from '../reducers';

export const store = createStore(
  createRootReducer({ }),
  applyMiddleware(ReduxThunk),
);

import { combineReducers } from 'redux';
import gymkhanas, { IGymkhanaState } from './gymkhanas';
import users, { IUserState } from './users';

export interface IState {
  users?: IUserState;
  gymkhanas?: IGymkhanaState;
}

export default (state: any) => combineReducers({
  users,
  gymkhanas,
});

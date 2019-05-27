import { combineReducers } from 'redux';
import users, { IUserState } from './users';

export interface IState {
  users?: IUserState;
}

export default (state: any) => combineReducers({
  users,
});

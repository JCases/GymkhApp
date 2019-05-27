import { Reducer } from 'redux';
import { users } from '../actions';
import { IUser } from '../shared';

export interface IUserState {
  user?: IUser;
  rehydrated: boolean;
}

const defaultState = { rehydrated: false };

// FIXME: LocalStorage for Android and IOs
const reducer: Reducer<IUserState> = (state: IUserState = defaultState, action): IUserState => {
  switch (action.type) {
    case users.constants.SIGN_IN:
      // localStorage.setItem('user-jwt', action.data.token);
      return { ...state, user: action.data };

    case users.constants.SIGN_OUT:
      // localStorage.removeItem('user-jwt');
      return { ...state, user: undefined };

    case users.constants.REHYDRATE_FINISHED:
      return { ...state, rehydrated: true };
    default:
      return state || defaultState;
  }
};

export default reducer;

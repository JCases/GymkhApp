import { AsyncStorage } from 'react-native';
import { Reducer } from 'redux';
import { users } from '../actions';
import { IGymkhana, IUser } from '../shared';

export interface IUserState {
  user?: IUser;
  gymkhanas?: IGymkhana[];
  rehydrated: boolean;
}

const defaultState = { rehydrated: false, user: undefined, gymkhanas: undefined };

// FIXME: LocalStorage for Android and IOs
const reducer: Reducer<IUserState> = (state: IUserState = defaultState, action): IUserState => {
  switch (action.type) {
    case users.constants.SIGN_IN_FINISHED:
      AsyncStorage.setItem('user-jwt', action.data.token);
      return { ...state, user: action.data };

    case users.constants.SIGN_OUT:
      AsyncStorage.removeItem('user-jwt');
      return { ...state, user: undefined };

    case users.constants.REGISTER_FINISHED:
      AsyncStorage.setItem('user-jwt', action.data.token);
      return { ...state, user: action.data };

    case users.constants.GET_GYMKHANAS_FINISHED:
      return { ...state, gymkhanas: action.data };

    case users.constants.UPDATE_USER_FINISHED:
      return { ...state, user: action.data };

    case users.constants.REHYDRATE_FINISHED:
      return { ...state, rehydrated: true };
    default:
      return state || defaultState;
  }
};

export default reducer;

import { Dispatch } from 'redux';

import { Errors, IGymkhana, IResponse, IUser } from '../shared';
import client from '../utils/http';

export const constants = {
  SIGN_IN: '@@users/SignIn',
  SIGN_IN_FINISHED: '@@users/SignInFinished',

  SIGN_OUT: '@@users/SignOut',

  REGISTER: '@@users/Register',
  REGISTER_FINISHED: '@@users/RegisterFinished',

  REHYDRATE_TOKEN: '@users/RehydrateToken',
  REHYDRATE_FINISHED: '@@users/SignInRehydrateFinished',

  GET_GYMKHANAS: '@@users/GetGymkhanas',
  GET_GYMKHANAS_FINISHED: '@@users/GetGymkhanasFinished',

  UPDATE_USER: '@@users/UpdateUser',
  UPDATE_USER_FINISHED: '@@users/UpdateUserFinished',
};

export const signInAction = () => ({ type: constants.SIGN_IN });
export const finishedsignInAction = (user: IUser) => ({ type: constants.SIGN_IN_FINISHED, data: user });

export const signOutAction = () => ({ type: constants.SIGN_OUT });

export const registerAction = () => ({ type: constants.REGISTER });
export const finishedregisterAction = (user: IUser) => ({ type: constants.REGISTER_FINISHED, data: user });

export const rehydrateAction = () => ({ type: constants.REHYDRATE_TOKEN });
export const finishedRehydrateAction = () => ({ type: constants.REHYDRATE_FINISHED });

export const getGymkhanasAction = () => ({ type: constants.GET_GYMKHANAS });
export const finishedgetGymkhanasAction = (gymkhanas: IGymkhana[]) => ({ type: constants.GET_GYMKHANAS_FINISHED, data: gymkhanas });

export const updateUserAction = () => ({ type: constants.UPDATE_USER });
export const finishedupdateUserAction = (user: IUser) => ({ type: constants.UPDATE_USER_FINISHED, data: user });

export const rehydrate = () => (dispatch: Dispatch) => {
  dispatch(rehydrateAction());
  return client.get<IResponse<IUser>>('user/auth/rehydrate').then(r => {
    dispatch(finishedRehydrateAction());
    if (r.data && r.data.result) {
      dispatch(finishedsignInAction(r.data.result));
    }
  }).catch(e => {
    if (e.code === Errors.incorrectCredentials) dispatch(finishedRehydrateAction());
  });
};

export const signIn = (email: string, password: string) => (dispatch: Dispatch) => {
  dispatch(signInAction());
  return client.post<IResponse<IUser>>('user/auth/', { email, password }).then(r => {
    if (r.data && r.data.result) dispatch(finishedsignInAction(r.data.result));
    else dispatch(finishedregisterAction({}));
  });
};

export const register = (email: string, password: string, nick: string, city: string) => (dispatch: Dispatch) => {
  dispatch(registerAction());
  return client.post<IResponse<IUser>>('user/register/', { email, password, nick, city }).then(r => {
    if (r.data && r.data.result) dispatch(finishedregisterAction(r.data.result));
    else dispatch(finishedregisterAction({}));
  });
};

export const getGymkhanas = (user: IUser) => (dispatch: Dispatch) => {
  dispatch(getGymkhanasAction());
  return client.post<IResponse<IGymkhana[]>>('user/gymkhana/', { user }).then(r => {
    if (r.data && r.data.result) dispatch(finishedgetGymkhanasAction(r.data.result));
  });
};

export const updateUser = (user: IUser) => (dispatch: Dispatch) => {
  dispatch(updateUserAction());
  return client.put<IResponse<IUser>>('user/update/', { user }).then(r => {
    if (r.data && r.data.result) dispatch(finishedupdateUserAction(r.data.result));
  });
};

export default { constants, signInAction, finishedsignInAction, registerAction, signOutAction, finishedregisterAction, rehydrateAction, finishedRehydrateAction, rehydrate, signIn, register, getGymkhanas, getGymkhanasAction, finishedgetGymkhanasAction, updateUserAction, finishedupdateUserAction, updateUser };

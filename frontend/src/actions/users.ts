import { Dispatch } from 'redux';

import { Errors, IResponse, IUser } from '../shared';
import client from '../utils/http';

export const constants = {
  SIGN_IN: '@@users/SignIn',
  SIGN_OUT: '@@users/SignOut',
  REHYDRATE_TOKEN: '@users/RehydrateToken',
  REHYDRATE_FINISHED: '@@users/SignInRehydrateFinished',
};

export const signInAction = (user: IUser) => ({ type: constants.SIGN_IN, data: user });
export const signOutAction = () => ({ type: constants.SIGN_OUT });
export const rehydrateAction = () => ({ type: constants.REHYDRATE_TOKEN });
export const finishedRehydrateAction = () => ({ type: constants.REHYDRATE_FINISHED });

export const rehydrate = () => (dispatch: Dispatch) => {
  dispatch(rehydrateAction());
  return client.get<IResponse<IUser>>('user/auth/rehydrate').then(r => {
    dispatch(finishedRehydrateAction());
    if (r.data && r.data.result) {
      dispatch(signInAction(r.data.result));
    }
  }).catch(e => {
    if (e.code === Errors.incorrectCredentials) dispatch(finishedRehydrateAction());
  });
};

export default { constants, signInAction, rehydrateAction, finishedRehydrateAction, rehydrate };

import { Dispatch } from 'redux';

import { IGymkhana, IPhase, IResponse } from '../shared';
import client from '../utils/http';

export const constants = {
  GET_GYMKHANAS: '@@gymkhanas/GetGymkhanas',
  GET_GYMKHANAS_FINISHED: '@@gymkhanas/GetGymkhanasFinished',

  SELECT_GYMKHANA: '@@gymkhanas/SelectGymkhana',
  UNSELECT_GYMKHANA: '@@gymkhanas/UnselectGymkhana',
  REMOVE_PHASES: '@@gymkhanas/RemovePhases',

  GET_PHASES: '@@gymkhanas/GetPhases',
  GET_PHASES_FINISHED: '@@gymkhanas/GetPhasesFinished',
};

export const getGymkhanasAction = () => ({ type: constants.GET_GYMKHANAS });
export const finishedgetGymkhanasAction = (gymkhanas: IGymkhana[]) => ({ type: constants.GET_GYMKHANAS_FINISHED, data: gymkhanas });

export const selectGymkhana = (gymkhana: IGymkhana) => ({ type: constants.SELECT_GYMKHANA, data: gymkhana });
export const unselectGymkhana = () => ({ type: constants.UNSELECT_GYMKHANA });
export const removePhases = () => ({ type: constants.REMOVE_PHASES });

export const getPhasesAction = () => ({ type: constants.GET_PHASES });
export const finishedgetPhasesAction = (phases: IPhase[]) => ({ type: constants.GET_PHASES_FINISHED, data: phases });

export const getGymkhanas = (city: string) => (dispatch: Dispatch) => {
  dispatch(getGymkhanasAction());
  return client.get<IResponse<IGymkhana[]>>(`/gymkhana/${city}`).then(r => {
    if (r.data && r.data.result) dispatch(finishedgetGymkhanasAction(r.data.result));
  });
};

export const getPhases = (gymkhana: IGymkhana) => (dispatch: Dispatch) => {
  dispatch(getPhasesAction());
  return client.post<IResponse<IPhase[]>>('/gymkhana/phases', { gymkhana: { id: gymkhana.id } }).then(r => {
    if (r.data && r.data.result) dispatch(finishedgetPhasesAction(r.data.result));
  });
};

export default { constants, getGymkhanas, getGymkhanasAction, finishedgetGymkhanasAction, getPhases, getPhasesAction, finishedgetPhasesAction, selectGymkhana, unselectGymkhana, removePhases };

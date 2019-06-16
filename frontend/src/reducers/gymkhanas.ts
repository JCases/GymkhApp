import { Reducer } from 'redux';
import { gymkhanas } from '../actions';
import { IGymkhana, IPhase } from '../shared';

export interface IGymkhanaState {
  gymkhanas?: IGymkhana[];
  phases?: IPhase[];
  currentGymkhana?: IGymkhana;
  currentPhase?: IGymkhana;
}

const defaultState = { phases: undefined, currentGymkhana: undefined, currentPhase: undefined, gymkhanas: undefined };

const reducer: Reducer<IGymkhanaState> = (state: IGymkhanaState = defaultState, action): IGymkhanaState => {
  switch (action.type) {
    case gymkhanas.constants.GET_GYMKHANAS_FINISHED:
      return { ...state, gymkhanas: action.data };

    case gymkhanas.constants.SELECT_GYMKHANA:
      return { ...state, currentGymkhana: action.data };
    case gymkhanas.constants.UNSELECT_GYMKHANA:
      return { ...state, currentGymkhana: undefined };
    case gymkhanas.constants.REMOVE_PHASES:
      return { ...state, phases: undefined };

    case gymkhanas.constants.GET_PHASES_FINISHED:
      const p = [...action.data];
      return { ...state, phases: p };

    default:
      return state || defaultState;
  }
};

export default reducer;

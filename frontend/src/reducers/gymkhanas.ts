import { Reducer } from 'redux';
import { gymkhanas } from '../actions';
import { IGymkhana, IPhase } from '../shared';

export interface IGymkhanaState {
  gymkhanas?: IGymkhana[];
  phases?: IPhase[];
  currentGymkhana?: IGymkhana;
  lastPhase?: number;
}

const defaultState: IGymkhanaState = { phases: undefined, currentGymkhana: undefined, lastPhase: undefined, gymkhanas: undefined };

const reducer: Reducer<IGymkhanaState> = (state: IGymkhanaState = defaultState, action): IGymkhanaState => {
  switch (action.type) {
    case gymkhanas.constants.GET_GYMKHANAS_FINISHED:
      return { ...state, gymkhanas: action.data };

    case gymkhanas.constants.SELECT_GYMKHANA:
      return { ...state, currentGymkhana: action.data };
    case gymkhanas.constants.UNSELECT_GYMKHANA:
      return { ...state, currentGymkhana: undefined };
    case gymkhanas.constants.REMOVE_PHASES:
      return { ...state, phases: undefined, lastPhase: undefined };
    case gymkhanas.constants.PHASE_COMPLETE:
      return { ...state, lastPhase: state.lastPhase! + 1 };

    case gymkhanas.constants.GET_PHASES_FINISHED:
      const p = [...action.data];
      return { ...state, phases: p };

    case gymkhanas.constants.GET_LAST_PHASE_FINISHED:
      return { ...state, lastPhase: action.data };

    default:
      return state || defaultState;
  }
};

export default reducer;

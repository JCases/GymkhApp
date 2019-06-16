import { IGymkhana, IUser } from '..';

export interface IPhase {
  id?: string;
  name?: string;
  description?: string;
  phaseOrder?: number;
  image?: string;
  position?: string;
  gymkhana?: IGymkhana;
  users?: IUser[];
}

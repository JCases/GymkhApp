import { IGymkhana, IUser } from '..';

export interface IPhase {
  id?: string;
  name?: string;
  description?: string;
  phaseOrder?: number;
  image?: Buffer;
  gymkhana?: IGymkhana;
  users?: IUser[];
}

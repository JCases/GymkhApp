import { IGymkhana, IPhase } from '..';

export interface IUser {
  id?: string;
  nick?: string;
  email?: string;
  password?: string;
  image?: Buffer;
  firstName?: string;
  lastName?: string;
  token?: string;
  gymkhanas?: IGymkhana[];
  phases?: IPhase[];
}

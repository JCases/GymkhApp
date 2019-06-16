import { IGymkhana, IPhase } from '..';

export interface IUser {
  id?: string;
  nick?: string;
  email?: string;
  password?: string;
  image?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  city?: string;
  gymkhanas?: IGymkhana[];
  phases?: IPhase[];
}

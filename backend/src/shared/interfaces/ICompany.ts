import { IGymkhana } from '..';

export interface ICompany {
  id?: string;
  name?: string;
  image?: string;
  gymkhanas?: IGymkhana[];
}

import { ICompany, IPhase, IUser } from '..';

export interface IGymkhana {
  id?: string;
  name?: string;
  description?: string;
  start?: Date;
  end?: Date;
  image?: string;
  city?: string;
  users?: IUser[];
  company?: ICompany;
  phases: IPhase[];
}

import { IPhase } from './IPhase';

export interface IGymkhana {
  id?: string;
  logo?: string;
  name?: string;
  date?: Date;
  phases: IPhase[];
  background?: string;
  description?: string;
  participants?: string;
}

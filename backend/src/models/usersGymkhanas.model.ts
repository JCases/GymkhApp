import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import Gymkhana from './gymkhana.model';
import User from './user.model';

@Table({ timestamps: true, paranoid: true })
export default class UsersGymkhanas extends Model<UsersGymkhanas> {
  @ForeignKey(() => User)
  @Column
  public userId?: string;

  @ForeignKey(() => Gymkhana)
  @Column
  public gymkhanaId?: string;
}

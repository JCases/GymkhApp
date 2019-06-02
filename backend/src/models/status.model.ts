import { AllowNull, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import Phase from './phase.model';
import User from './user.model';

@Table({ timestamps: true, paranoid: true })
export default class Status extends Model<Status> {
  @AllowNull(false)
  @Column
  public gymkhanaId?: string;

  @ForeignKey(() => User)
  @Column
  public userId?: string;

  @ForeignKey(() => Phase)
  @Column
  public phaseId?: string;

  @AllowNull(false)
  @Column
  public complete?: boolean;

  @AllowNull(false)
  @Column
  public completeDate?: Date;
}

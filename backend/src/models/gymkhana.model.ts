import { AllowNull, BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, HasMany, Length, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

import Company from './company.model';
import Phase from './phase.model';
import User from './user.model';
import UsersGymkhanas from './usersGymkhanas.model';

@Table({ timestamps: true, paranoid: true })
export default class Gymkhana extends Model<Gymkhana> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id?: string;

  @Length({ min: 2, max: 60 })
  @AllowNull(false)
  @Unique(true)
  @Column
  public name?: string;

  @AllowNull(false)
  @Column
  public start?: Date;

  @AllowNull(false)
  @Column
  public end?: Date;

  @AllowNull(false)
  @Column
  public image?: Buffer;

  @AllowNull(false)
  @Column
  public city?: string;

  // Phase (M) - Gymkhana (O)
  @HasMany(() => Phase)
  public gymkhanas?: Phase[];

  // User (M) - Gymkhana (M)
  @BelongsToMany(() => User, () => UsersGymkhanas)
  public users?: User[];

  // Company (O) - Gymkhana (M)
  @ForeignKey(() => Company)
  @Column
  public companyId?: string;

  @BelongsTo(() => Company)
  public company?: Company;
}

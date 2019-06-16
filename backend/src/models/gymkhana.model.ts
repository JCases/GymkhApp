import { HasManyCreateAssociationMixin, HasManyGetAssociationsMixin } from 'sequelize';
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

  @Length({ min: 2, max: 400 })
  @AllowNull(false)
  @Column
  public description?: string;

  @AllowNull(false)
  @Column
  public start?: Date;

  @AllowNull(false)
  @Column
  public end?: Date;

  @AllowNull(false)
  @Column
  public image?: string;

  @AllowNull(false)
  @Column
  public city?: string;

  // User (M) - Gymkhana (M)
  @BelongsToMany(() => User, () => UsersGymkhanas)
  public users?: User[];

  // Company (O) - Gymkhana (M)
  @BelongsTo(() => Company)
  public company?: Company;

  @ForeignKey(() => Company)
  @Column
  public companyId?: string;

  // Phase (M) - Gymkhana (O)
  @HasMany(() => Phase)
  public phases?: Phase[];

  // Associations
  public createPhase!: HasManyCreateAssociationMixin<Phase>;
  public getPhases!: HasManyGetAssociationsMixin<Phase>;
}

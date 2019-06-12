import { BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin } from 'sequelize';
import { AllowNull, BelongsToMany, Column, DataType, Default, IsEmail, Length, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

import Gymkhana from './gymkhana.model';
import Phase from './phase.model';
import Status from './status.model';
import UsersGymkhanas from './usersGymkhanas.model';

@Table({ timestamps: true, paranoid: true })
export default class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id?: string;

  @Length({ min: 2, max: 40 })
  @AllowNull(false)
  @Unique(true)
  @Column
  public nick?: string;

  @IsEmail
  @Length({ min: 2, max: 100 })
  @AllowNull(false)
  @Unique(true)
  @Column
  public email?: string;

  @AllowNull(false)
  @Column
  public password?: string;

  @Column
  public image?: Buffer;

  @Length({ min: 2, max: 80 })
  @Column
  public firstName?: string;

  @Length({ min: 2, max: 120 })
  @Column
  public lastName?: string;

  // FIXME: Need Classes for Not Empty Cell
  @Column
  public token?: string;

  // Gymkhana (M) - User (M)
  @BelongsToMany(() => Gymkhana, () => UsersGymkhanas)
  public gymkhanas?: Gymkhana[];

  // Status (M) - User (M)
  @BelongsToMany(() => Phase, () => Status)
  public phases?: Phase[];

  // Associations
  public addGymkhana!: BelongsToManyAddAssociationMixin<Gymkhana, Gymkhana['id']>;
  public getGymkhanas!: BelongsToManyGetAssociationsMixin<Gymkhana>;

  public addPhase!: BelongsToManyAddAssociationMixin<Phase, Phase['id']>;
  public getPhases!: BelongsToManyGetAssociationsMixin<Phase>;
}

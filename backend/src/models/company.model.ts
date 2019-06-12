import { HasManyCreateAssociationMixin, HasManyGetAssociationsMixin } from 'sequelize';
import { AllowNull, Column, DataType, Default, HasMany, Length, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import Gymkhana from './gymkhana.model';

@Table({ timestamps: true, paranoid: true })
export default class Company extends Model<Company> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id?: string;

  @Length({ min: 2, max: 40 })
  @AllowNull(false)
  @Unique(true)
  @Column
  public name?: string;

  @AllowNull(false)
  @Column
  public image?: Buffer;

  // Gymkhana (O) - Company (M)
  @HasMany(() => Gymkhana)
  public gymkhanas?: Gymkhana[];

  // Associations
  public createGymkhana!: HasManyCreateAssociationMixin<Gymkhana>;
  public getGymkhanas!: HasManyGetAssociationsMixin<Gymkhana>;
}

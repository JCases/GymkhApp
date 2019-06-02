import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Length, Model, PrimaryKey, Table } from 'sequelize-typescript';

import Gymkhana from './gymkhana.model';

@Table({ timestamps: true, paranoid: true })
export default class Phase extends Model<Phase> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id?: string;

  @Length({ min: 2, max: 60 })
  @AllowNull(false)
  @Column
  public name?: string;

  @AllowNull(false)
  @Column
  public description?: string;

  @AllowNull(false)
  @Column
  public phaseOrder?: number;

  @AllowNull(false)
  @Column
  public image?: Buffer;

  @AllowNull(false)
  @Column
  public position?: string;

  // Phase (M) - Gymkhana (O)
  @ForeignKey(() => Gymkhana)
  @Column
  public gymkhanaId?: string;

  @BelongsTo(() => Gymkhana)
  public gymkhana?: Gymkhana;
}

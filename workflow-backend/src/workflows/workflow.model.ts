import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import * as Sequelize from 'sequelize';
import { User } from '../users/user.model';

@Table({ tableName: 'workflows', timestamps: true })
export class Workflow extends Model<Workflow> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: Sequelize.CreationOptional<string>;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.JSONB, allowNull: false, defaultValue: {} })
  declare data: Record<string, unknown>;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  declare userId: string;

  @BelongsTo(() => User)
  declare user?: User;
}

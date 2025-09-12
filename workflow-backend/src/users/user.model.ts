import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript';
import * as Sequelize from 'sequelize';
import { Workflow } from '../workflows/workflow.model';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: Sequelize.CreationOptional<string>;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare passwordHash: string;

  @Column({
    type: DataType.ENUM('user', 'admin'),
    allowNull: false,
    defaultValue: 'user',
  })
  declare role: 'user' | 'admin';

  @HasMany(() => Workflow)
  declare workflows?: Workflow[];
}

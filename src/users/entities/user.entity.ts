import { ObjectId } from 'mongodb';
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from 'typeorm';

@Entity('user')
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  inactive: boolean;

  @Column()
  activeMenuId: ObjectId;

  @CreateDateColumn()
  createdAt: Date;
}

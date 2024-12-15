import { Meal, Recipe } from 'src/common/types';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('menu')
export class Menu {
  @ObjectIdColumn()
  _id: any;

  @Column('simple-json')
  meals: Record<Meal, Recipe>;
}

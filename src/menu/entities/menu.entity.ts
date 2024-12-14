import { Meal, Recipe } from 'src/common/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-json')
  meals: Record<Meal, Recipe>;
}

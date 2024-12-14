import { ApiProperty } from '@nestjs/swagger';
import { IsJSON } from 'class-validator';
import { Meal, Recipe } from 'src/common/types';

export class CreateMenuDto {
  @ApiProperty({
    type: 'object',
    example: {
      breakfast: ['pancakes', 'coffee'],
      bruch: ['food'],
      lunch: ['salad', 'chicken'],
      snack: ['fruit', 'nuts'],
      dinner: ['steak', 'vegetables'],
    },
    additionalProperties: null,
  })
  @IsJSON()
  meals: Record<Meal, Recipe>;
}

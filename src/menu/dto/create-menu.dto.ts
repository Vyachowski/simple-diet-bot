import { ApiProperty } from '@nestjs/swagger';
import { IsJSON } from 'class-validator';
import basicMenu from 'src/common/basic-menu';
import { Meal, Recipe } from 'src/common/types';

export class CreateMenuDto {
  @ApiProperty({
    type: 'object',
    example: basicMenu,
    additionalProperties: null,
  })
  @IsJSON()
  menu: Record<Meal, Recipe>;
}

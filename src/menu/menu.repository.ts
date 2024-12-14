import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenuRepository extends Repository<Menu> {
  async addMenu(createMenuDto: CreateMenuDto): Promise<Menu> {
    const { meals } = createMenuDto;

    const menu = this.create({
      meals,
    });

    return await this.save(menu);
  }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Menu } from './entities/menu.entity';
import basicMenu from 'src/common/basic-menu';

@Injectable()
export class MenuService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    const initialMenu = { meals: basicMenu };

    try {
      const count = await this.dataSource.manager.count(Menu);

      if (count > 0) {
        console.log('Menu collection exists and contains records.');
      } else {
        console.log(
          'Menu collection exists but is empty, data will be created.',
        );
        const newMenu = await this.dataSource.mongoManager.create(
          Menu,
          initialMenu,
        );
        const result = await this.dataSource.manager.save(newMenu);
        console.log('Data was created:', result);
      }
    } catch {
      console.error('Error checking menu collection, data will be created.');
      const newMenu = await this.dataSource.mongoManager.create(
        Menu,
        initialMenu,
      );
      const result = await this.dataSource.manager.save(newMenu);
      console.log('Data was created:', result);
    }
  }

  // async create(createMenuDto: CreateMenuDto) {
  //   return await this.menuRepository.create(createMenuDto);
  // }

  // async findAll() {
  //   return await this.menuRepository.find();
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} menu`;
  // }

  // update(id: number, updateMenuDto: UpdateMenuDto) {
  //   return `This action updates a #${id} menu`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} menu`;
  // }
}

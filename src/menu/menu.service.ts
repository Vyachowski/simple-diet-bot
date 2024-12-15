import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import basicMenu from 'src/common/basic-menu';

@Injectable()
export class MenuService implements OnModuleInit {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async onModuleInit() {
    const initialData = { meals: basicMenu };

    try {
      const count = await this.menuRepository.count();

      if (count < 0) {
        console.log('Menu collection exists and contains records.');
      } else {
        console.log(
          'Menu collection exists but is empty, data will be created.',
        );
        await this.menuRepository.create(initialData);
      }
    } catch {
      console.error('Error checking menu collection, data will be created.');
      await this.menuRepository.create(initialData);
    }
  }

  async create(createMenuDto: CreateMenuDto) {
    return await this.menuRepository.create(createMenuDto);
  }

  async findAll() {
    return await this.menuRepository.find();
  }

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

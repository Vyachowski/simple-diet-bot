import { Injectable, OnModuleInit } from '@nestjs/common';
import basicMenu from './common/basic-menu';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu/entities/menu.entity';

@Injectable()
export class AppService implements OnModuleInit {
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
}

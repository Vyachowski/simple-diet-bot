import { Injectable } from '@nestjs/common';
import { MenuService } from './menu/menu.service';

@Injectable()
export class AppService {
  constructor(private readonly menuService: MenuService) {}

  async getRandomMenu() {
    const allMenus = await this.menuService.findAll();
    const randomIndex = Math.floor(Math.random() * allMenus.length);

    return allMenus[randomIndex].meals;
  }
}

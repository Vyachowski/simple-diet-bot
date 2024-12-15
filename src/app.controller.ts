import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { groceryList } from './common/basic-menu';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @Render('index')
  async root() {
    const menu = await this.appService.getRandomMenu();
    return { meals: Object.values(menu), groceryList };
  }
}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MenuService } from 'src/menu/menu.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, MenuService],
  exports: [UsersService],
})
export class UsersModule {}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { Environment } from 'src/common/types';
import { MenuService } from 'src/menu/menu.service';
import * as bcrypt from 'bcrypt';
import omit from 'lodash.omit';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    private dataSource: DataSource,
    private configService: ConfigService,
    private menuService: MenuService,
  ) {}

  async onModuleInit() {
    const env = this.configService.get('ENV');
    const testUsername = this.configService.get('TEST_USERNAME');

    if (env.toLowerCase() === Environment.Development) {
      const existingTestUser = await this.dataSource.mongoManager.findOneBy(
        User,
        {
          username: testUsername,
        },
      );

      if (existingTestUser) {
        console.info('Test user already exists. Skipping creation.');
        return;
      }

      const saltOrRounds = 10;
      const password = this.configService.get('TEST_PASSWORD');
      const hash = await bcrypt.hash(password, saltOrRounds);

      const testUser: CreateUserDto = {
        username: testUsername,
        password: hash,
      };

      try {
        await this.create(testUser);
        console.info('Test user was succesfully created!');
      } catch (e) {
        console.error(e?.message);
        console.log(e?.stackTrace);
      }
    }
  }

  async create(createUserDto: CreateUserDto) {
    const allMenus = await this.menuService.findAll();
    const randomIndex = Math.floor(Math.random() * allMenus.length);
    const randomMenuId = allMenus[randomIndex]._id;

    const user = this.dataSource.mongoManager.create(User, {
      ...createUserDto,
      activeMenuId: randomMenuId,
    });
    return await this.dataSource.mongoManager.save(user);
  }

  async findAll() {
    return await this.dataSource.mongoManager.find(User);
  }

  async findOne(id: number) {
    return await this.dataSource.mongoManager.findOneBy(User, id);
  }

  async findOneByUsername(username: string) {
    return await this.dataSource.mongoManager.findOneBy(User, { username });
  }

  async getUserMenu(id: number) {
    const user = await this.findOne(id);

    const userMenuId = user.activeMenuId;
    const menuData = await this.menuService.findOne(
      Number(userMenuId.toString()),
    );
    const menu = omit(menuData, ['createdAt', '_id']);

    return menu;
  }

  // TODO: Add user password updating
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // deactivate(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}

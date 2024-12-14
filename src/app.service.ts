import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  async onModuleInit() {
    console.log('Check database integrity and add initial data');
  }
}

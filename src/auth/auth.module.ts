import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController, AuthPageController } from './auth.controller';

@Module({
  controllers: [AuthController, AuthPageController],
  providers: [AuthService],
})
export class AuthModule {}

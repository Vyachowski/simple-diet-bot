import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController, AuthPageController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [UsersModule],
  controllers: [AuthController, AuthPageController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}

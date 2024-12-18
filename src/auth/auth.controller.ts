import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
  Render,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthPageController {
  @Get('/')
  @Render('auth')
  renderAuthPage() {
    return { data: '' };
  }
}

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  getAuthData() {
    return 'your auth data';
  }

  @Post('/register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('/login')
  login() {
    return this.authService.findAll();
  }

  @Post('/logout')
  logout() {
    return this.authService.findAll();
  }

  @Post('/refresh-token')
  refreshToken() {
    return 'refreshed!';
  }

  // @Post('/password-reset')
  // resetPassword() {
  //   return 'refreshed!';
  // }

  // @Put('/password')
  // updatePassword() {
  //   return 'refreshed!';
  // }
}

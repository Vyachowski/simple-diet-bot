import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
  Render,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
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
    return createAuthDto.toString();
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  async logout(@Request() req) {
    return req.logout();
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

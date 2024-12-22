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
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
// import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Response } from 'express';
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
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie('refreshTOken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect('/');
  }

  @UseGuards(LocalAuthGuard)
  @Post('/logout')
  async logout(@Request() req) {
    return req.logout();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
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

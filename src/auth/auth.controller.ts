import {
  Controller,
  Get,
  Post,
  Body,
  Render,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Response } from 'express';

@Controller()
export class AuthPageController {
  @Get('/login')
  @Render('login')
  renderLoginPage(@Request() req) {
    return {
      error: req.flash('error')[0],
      username: req.flash('username')[0] || '',
      password: req.flash('password'),
    };
  }

  @Get('/sign-up')
  @Render('sign-up')
  renderSignInPage() {
    return;
  }
}

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/sign-up')
  async signUp(
    @Body() registerDto: RegisterDto,
    // @Session() session,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { username, password, passwordConfirmation } = registerDto;

    if (password !== passwordConfirmation) {
      // TODO: ADD FLASH MESSAGES BASED ON RESULT OF VALIDATION
      // res.flash('error', 'Password and password confirmation are not equal');
      return res.redirect('/sign-up');
    }

    try {
      const { accessToken, refreshToken } = await this.authService.signUp(
        username,
        password,
      );

      res.cookie('access_token', accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000, // 15 minutes
      });
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.redirect('/');
    } catch (e) {
      console.error(e?.message);
      console.log(e?.stack);
      res.redirect('/sign-up');
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Res() res: Response) {
    console.log('Working!!!');
    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
    );

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.redirect('/');
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
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

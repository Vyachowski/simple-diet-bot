import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    let isPasswordMatch = false;
    let user = null;

    try {
      user = await this.usersService.findOneByUsername(username);
      isPasswordMatch = await bcrypt.compare(pass, user?.password);
    } catch (e) {
      console.error(e?.message);
      console.log(e?.stack);
      throw new UnauthorizedException();
    }

    if (isPasswordMatch && user) {
      return user;
    }

    throw new UnauthorizedException();
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { username: user.username, sub: user._id.toString() };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async signUp(username: string, password: string) {
    const existingUser = await this.usersService.findOneByUsername(username);

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create({
      username,
      password: hashedPassword,
    });

    const payload = { username: newUser.username, sub: newUser._id.toString() };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
      user: newUser,
    };
  }
}

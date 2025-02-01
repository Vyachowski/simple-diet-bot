import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      failureRedirect: '/login',
    });
  }

  async validate(username: string, password: string): Promise<User | Error> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  // handleRequest<User>(
  //   err: Error | null,
  //   user: User | null,
  //   _info: never,
  //   context: ExecutionContext,
  // ): User | void {
  //   const res = context.switchToHttp().getResponse();
  //   console.log('Wow!');
  //   if (err || !user) {
  //     return res.redirect('/login');
  //   }

  //   return user;
  // }
}

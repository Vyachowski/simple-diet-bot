import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, info, context: ExecutionContext) {
    const req = context?.switchToHttp()?.getRequest();
    const res = context?.switchToHttp()?.getResponse();

    if (err || !user) {
      req.flash('error', 'Неверный логин или пароль');
      req.flash('username', req.body.username);
      req.flash('password', req.body.password);

      res.redirect('/login');

      throw new UnauthorizedException();
    }

    return user;
  }
}

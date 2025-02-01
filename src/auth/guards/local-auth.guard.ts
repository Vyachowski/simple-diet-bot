import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, info, context: ExecutionContext) {
    const response = context?.switchToHttp()?.getResponse<Response>();

    if (err || !user) {
      return response.redirect('/login');
    }

    return user;
  }
}

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { decode } from '../../auth/auth';

@Injectable()
export class IsLoggedGuard implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext) {
    const token = context.switchToHttp().getRequest().headers.authorization;
    const user = decode(token);
    context.switchToHttp().getRequest().user = user;
    return true;
  }
}

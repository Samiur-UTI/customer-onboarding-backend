import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser = User>(
    err: any,
    user: TUser,
    info: any,
    context: ExecutionContext,
  ): TUser {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException('Invalid or missing authentication token')
      );
    }
    // Attach user to the request object
    const request = context.switchToHttp().getRequest();
    request.user = user;
    return user;
  }
}

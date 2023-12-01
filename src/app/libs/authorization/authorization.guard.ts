import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { GetVerificationKey, expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';
import { expressjwt } from 'express-jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_AUDIENCE: string;
  private AUTH0_DOMAIN: string;

  constructor(private configService: ConfigService, userService: UserService) {
    this.AUTH0_AUDIENCE = this.configService.get('AUTH0_AUDIENCE') || '';
    this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN') || '';
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const response = ctx.getContext().res;

    // console.log('request', request);
    console.log(this.AUTH0_AUDIENCE);
    console.log(this.AUTH0_DOMAIN);

    const checkJwt = promisify(
      expressjwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
        }) as GetVerificationKey,
        audience: this.AUTH0_AUDIENCE,
        issuer: this.AUTH0_DOMAIN,
        algorithms: ['RS256'],
      }),
    );
    try {
      await checkJwt(request, response);
      // const jwt = request.user;
      // console.log('jwt', jwt);
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}

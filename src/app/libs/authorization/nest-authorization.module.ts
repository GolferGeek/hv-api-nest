import { Module } from '@nestjs/common';
import { AuthorizationGuard } from './authorization.guard';
import { UserModule } from 'src/app/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [],
  imports: [UserModule, ConfigModule],
  providers: [AuthorizationGuard],
  exports: [AuthorizationGuard],
})
export class NestAuthorizationModule {}

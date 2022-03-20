import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    }
  ]
})
export class UsersModule { }

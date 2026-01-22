import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [UsersModule,EmailModule, MongooseModule.forRoot(
      'mongodb://admin:admin123@localhost:27017/mail-server?authSource=admin'
    ), AuthModule, EmailModule,],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

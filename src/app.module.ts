import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, MongooseModule.forRoot(
      'mongodb://admin:admin123@localhost:27017/mail-server?authSource=admin'
    ),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

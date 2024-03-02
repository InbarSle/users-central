import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import {config} from '../assets/environment'

@Module({
  imports: [
    MongooseModule.forRoot(config.dbPath),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [ UserController],
  providers: [ UserService],
})
export class AppModule {}

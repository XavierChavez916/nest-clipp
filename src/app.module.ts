import { Module } from '@nestjs/common';
import { BadgeModule } from './badge/badge.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
    BadgeModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-badge'),
    CommonModule
  ],

})
export class AppModule {}
 
import { Module } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { BadgeController } from './badge.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Badge, BadgeSchema } from './entities/badge.entity';

@Module({
  controllers: [BadgeController],
  providers: [BadgeService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Badge.name,
        schema: BadgeSchema
      }
    ])
  ]
})
export class BadgeModule {}

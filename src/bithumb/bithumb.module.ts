import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpConfigService } from '../config/httpConfig.service';
import { BithumbService } from './bithumb.service';
import { BithumbController } from './bithumb.controller';
import { BithumbSchedule } from './bithumb.schedule';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useClass: HttpConfigService,
      inject: [ConfigService],
    })
  ],
  providers: [
    BithumbService, 
    BithumbSchedule
  ],
  controllers: [BithumbController],
})
export class BithumbModule {}

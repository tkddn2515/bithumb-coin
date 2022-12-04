import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule'
import { BithumbModule } from './bithumb/bithumb.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    BithumbModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

import {Module} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {BullModule } from  '@nestjs/bull'

import amqp from 'amqp-connection-manager';
import { Channel } from 'amqplib';

import { DemoModule } from 'src/demo/demo.module';
import { RumsanAppModule } from '@rumsan/app';
import { PrismaModule } from '@rumsan/prisma';
import {ListenerModule} from '../listeners/listener.module';
import {AppController} from './app.controller';
import { AppService } from './app.service';
import { TransportModule } from '../transport/transport.module';
import { WebSocketService } from './websocket.service';
import {QueueModule } from "@workspace/queue"
import { config } from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
   
    DemoModule,
    TransportModule,
    PrismaModule,
  RumsanAppModule,
    ListenerModule,
    QueueModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService:ConfigService) => ({
        redis: {
          host:configService.get('REDIS_HOST'),
          port:configService.get('REDIS_PORT'),
          password:configService.get('REDIS_PASSWORD'),
        },
        defaultJobOptions: {
          removeOnComplete: 20,
          removeOnFail: 20,
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 2000,
          }
        }
      })


  })
  ],
  controllers: [AppController],
  providers: [AppService, WebSocketService],
})
export class AppModule {}

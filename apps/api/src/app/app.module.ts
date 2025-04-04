import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';


import { RumsanAppModule } from '@rumsan/app';
import { PrismaModule } from '@rumsan/prisma';
import { QueueModule } from "@workspace/queue";
import { AmqpModule} from "@workspace/workers"


import { TransportModule } from '../transport/transport.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import amqp from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { QUEUES } from '@workspace/sdk/constants/events';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
   
  
    TransportModule,
    PrismaModule,
  RumsanAppModule,

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


    }),
    AmqpModule.forRootAsync({

      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService:ConfigService) => {
        const connection = amqp.connect(configService.get('AMQP_URL'));
        return connection.createChannel({
          setup: (channel: Channel) => {
            
            channel.assertQueue(QUEUES.TRANSPORT_API, { durable: true });
            channel.assertQueue(QUEUES.TRANSPORT_SMTP, { durable: true });
            channel.assertQueue(QUEUES.TRANSPORT_VOICE, { durable: true });
            channel.assertQueue(QUEUES.TRANSPORT_API, { durable: true });
            channel.assertQueue(QUEUES.TO_CONNECT, { durable: true });
            
}




        })
      }


    })
    
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}

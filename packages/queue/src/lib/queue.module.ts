import { DynamicModule, Global, Module } from '@nestjs/common';
import { AsyncOptions } from '@workspace/sdk/types/interfaces';
import { ChannelWrapper } from 'amqp-connection-manager';
//import { BatchManger } from './batch.manager';
//import { BroadcastLogQueue } from './broadcast-log.queue';
//import { BroadcastQueue } from './broadcast.queue';
import { TransportQueue } from './transport.queue';

@Global()
@Module({
  providers: [ TransportQueue],
  exports: [TransportQueue],
})
export class QueueModule {
  static forRootAsync(options: AsyncOptions<ChannelWrapper>): DynamicModule {
    const ampqProvider = {
      provide: 'AMQP_CONNECTION',
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    return {
      module: QueueModule,
      providers: [ampqProvider],
      exports: [ampqProvider],
    };
  }
}

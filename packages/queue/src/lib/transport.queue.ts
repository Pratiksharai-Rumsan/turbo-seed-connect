import { Inject, Injectable, Logger } from '@nestjs/common';
import { QUEUE_ACTIONS, QUEUES, QueueType } from '@workspace/sdk/constants/index';
import { QueueJobData } from '@workspace/sdk/types/queue.type';
import { ChannelWrapper } from 'amqp-connection-manager';

@Injectable()
export class TransportQueue {
  private readonly logger = new Logger(TransportQueue.name);
  constructor(
    @Inject('AMQP_CONNECTION')
    private readonly _channel: ChannelWrapper,
  ) {}

  async checkReadiness(data: {
    transportToCheck: QueueType;
    sessionCuid: string;
  }) {
    try {
      const queueJob: QueueJobData<{ sessionCuid: string }> = {
        action: QUEUE_ACTIONS.READINESS_CHECK,
        data,
      };

      return this._channel.sendToQueue(
        data.transportToCheck,
        Buffer.from(JSON.stringify(queueJob)),
        {
          persistent: true,
          timeout: 1000,
        },
      );
    } catch (error) {
      this.logger.error(error);
    }
    return false;
  }

  async confirmReadiness(data: { sessionCuid: string; maxBatchSize: number }) {
    try {
      const queueJob: QueueJobData<{
        sessionCuid: string;
        maxBatchSize: number;
      }> = {
        action: QUEUE_ACTIONS.READINESS_CONFIRM,
        data,
      };

      return this._channel.sendToQueue(
        QUEUES.TO_CONNECT,
        Buffer.from(JSON.stringify(queueJob)),
        {
          persistent: true,
          timeout: 1000,
        },
      );
    } catch (error) {
      this.logger.error(error);
    }
    return false;
  }
}

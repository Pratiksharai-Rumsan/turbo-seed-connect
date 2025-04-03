import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {DemoModule} from 'src/demo/demo.module';
import {ListenerModule} from '../listeners/listener.module';
import {AppController} from './app.controller';
import { AppService } from './app.service';
import { TransportModule } from '../transport/transport.module';
import {WebSocketService} from './websocket.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
   
    DemoModule,
    ListenerModule,
  ],
  controllers: [AppController],
  providers: [AppService, WebSocketService],
})
export class AppModule {}

import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConnectionsModule } from './connections/connections.module';
import { EndorsementsModule } from './endorsements/endorsements.module';
import { BalanceModule } from './balance/balance.module';
import { EndorsementsService } from './endorsements/endorsements.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
      ttl: 60, // seconds
      isGlobal: true,
    }),
    ConnectionsModule,
    EndorsementsModule,
    BalanceModule,
  ],
  controllers: [AppController],
  providers: [AppService, EndorsementsService],
})
export class AppModule {}

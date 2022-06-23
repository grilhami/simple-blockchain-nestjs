import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockchainController } from './blockchain/blockchain.controller';
import { BlockchainModule } from './blockchain/blockchain.module';
import { BlockService } from './block/block.service';
import { BlockModule } from './block/block.module';

@Module({
  imports: [BlockchainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

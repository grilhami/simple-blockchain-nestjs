import { Module } from '@nestjs/common';
import { BlockModule } from 'src/block/block.module';
import { BlockchainService } from './blockchain.service';

@Module({
  imports: [BlockModule],
  providers: [BlockchainService]
})
export class BlockchainModule {}

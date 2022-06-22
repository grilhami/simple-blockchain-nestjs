import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { BlockService } from 'src/block/block.service';
import { BlockDTO } from './dto';


@Injectable()
export class BlockchainService {

    // Blockchain
    chain:Array<BlockDTO> = [];

    // Length of the chain
    height:number = -1;

    constructor() {
        this.initializeChain()
    }


    async initializeChain():Promise<void> {
        if( this.height === -1){
            const block: BlockDTO = {
                body: "Genesis Block",
                hash: '',
                height: 0,
                time: 0,
                previousBlockHash: ''
            }
            await this._addBlock(block);
        }
    }

    _addBlock(block: BlockDTO):Promise<void> {
        const self = this;
        return new Promise(async (resolve, reject) => {

            if (self.chain.length > 0) {
                block.height = self.chain.length ;
                block.previousBlockHash = self.chain[self.chain.length - 1].hash;
            }

            block.body = Buffer.from(JSON.stringify(block.body)).toString("hex");
            block.time = new Date().getTime();

            const blockObj: BlockService = new BlockService(block)
            await blockObj.validate()

            const blockStr: string = JSON.stringify(block)
            block.hash = createHash("sha256").update(blockStr).digest("hex")

            self.chain.push(block)
        });
        
    }
}

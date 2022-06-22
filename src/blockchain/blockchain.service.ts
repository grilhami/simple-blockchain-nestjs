import { Injectable } from '@nestjs/common';
import { BlockDTO } from './dto/block.dto';


@Injectable()
export class BlockchainService {

    // Blockchain
    chain:Array<BlockDTO> = [];

    // Length of the chain
    height:number = -1;

    constructor() {
        this.initializeChain()
    }



    async initializeChain() {
        // if( this.height === -1){
        //     let block = new BlockClass.Block({data: 'Genesis Block'});
        //     await this._addBlock(block);
        // }
    }
}

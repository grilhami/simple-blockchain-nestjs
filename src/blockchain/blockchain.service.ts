import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { BlockService } from 'src/block/block.service';
import { BlockDTO, StarDTO, StarOwnershipDTO } from './dto';
import {verify} from 'bitcoinjs-message'
import { resolve } from 'path';
import { rejects } from 'assert';


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
                time: "",
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
            block.time = new Date().getTime().toString().slice(0,-3);

            const blockObj: BlockService = new BlockService(block)
            const validate: boolean = await blockObj.validate()

            if (validate) {
                const blockStr: string = JSON.stringify(block)
                block.hash = createHash("sha256").update(blockStr).digest("hex")

                self.chain.push(block)
                resolve(null)
            }
            reject("Block is not valid")
            
        });
        
    }

    getChainHeight():Promise<number> {
        return new Promise((resolve, reject) => {
            resolve(this.height);
        });
    }

    requestMessageOwnershipVerification(address:string): Promise<string> {
        return new Promise((resolve) => {
            resolve(`${address}:${new Date().getTime().toString().slice(0,-3)}}:starRegistry`)
        });

    }

    submitStar(address:string, message: string, signature:string, star:StarDTO):Promise<void> {
        const self = this;
        return new Promise(async (resolve, reject) => {
            const messageTime:number = parseInt(message.split(':')[1]);
            const currentTime: number= parseInt(new Date().getTime().toString().slice(0, -3));

            // Check if 5 minutes have passed
            if (currentTime - messageTime > 300) {
                reject("Message is expired");
            }

            const validMessage:boolean = verify(message, address, signature);

            if (validMessage) {
                const starOwnership: StarOwnershipDTO = {
                    address: address,
                    star,
                }
                const starStr: string = JSON.stringify(starOwnership)
                const block: BlockDTO = {
                    body: starStr,
                    hash: '',
                    height: 0,
                    time: "",
                    previousBlockHash: ''
                }

                self.chain.push(block)
            }
        });
    }

    getBlockByHash(hash:string):Promise<BlockDTO> {
        const self = this;
        return new Promise((resolve, reject) => {
            const block: BlockDTO = self.chain.find(block => block.hash === hash)
            if (block) {
                resolve(block)
            }
            reject("No block found.")
        });
    }

    getBlockByHeight(height:number):Promise<BlockDTO> {
        const self = this;
        return new Promise((resolve, reject) => {
            const block: BlockDTO = self.chain.find(block => block.height === height)
            if (block) {
                resolve(block)
            }
            reject("No block found.")
        });
    }

    getStarsByWalletAddress(address:string):Promise<StarDTO[]> {
        const self = this;
        return new Promise((resolve, reject) => {
            const stars: StarDTO[] = self.chain.map((block): StarDTO => {
                const hexToAscii:string = Buffer.from(block.body, "hex").toString()
                const starData:StarOwnershipDTO = JSON.parse(hexToAscii)

                if (starData.address === address) {
                    return starData.star
                }
            })

            resolve(stars)
        });
    }

    validateChain():Promise<Error[]> {
        const self = this;
        const errorLogs:Error[] = [];
        return new Promise((resolve, reject) => {
            self.chain.forEach(async (block, index) => {
                const blockObj: BlockService = new BlockService(block)
                const validation:boolean = await blockObj.validate()

                if (!validation) {
                    const errorLog:Error = new Error(`Block ${block.height} is not valid`)
                    errorLogs.push(errorLog)

                }
            })
        });
    }
}

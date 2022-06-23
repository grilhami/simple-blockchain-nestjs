import { BlockDTO, StarDTO, SubmitStarDTO } from './dto';
import { BlockchainService } from './blockchain.service';
export declare class BlockchainController {
    private blockchainServie;
    constructor(blockchainServie: BlockchainService);
    blockByHeight(height: string): Promise<BlockDTO>;
    requestOwnership(body: any): Promise<string>;
    SUBMITStar(star: SubmitStarDTO): Promise<BlockDTO>;
    blockByHash(hash: string): Promise<BlockDTO>;
    starsByOwner(address: string): Promise<StarDTO[]>;
}

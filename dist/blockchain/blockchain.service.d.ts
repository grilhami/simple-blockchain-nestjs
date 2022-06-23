import { BlockDTO, StarDTO } from './dto';
export declare class BlockchainService {
    chain: Array<BlockDTO>;
    height: number;
    constructor();
    initializeChain(): Promise<void>;
    _addBlock(block: BlockDTO): Promise<void>;
    getChainHeight(): Promise<number>;
    requestMessageOwnershipVerification(address: string): Promise<string>;
    submitStar(address: string, message: string, signature: string, star: StarDTO): Promise<BlockDTO>;
    getBlockByHash(hash: string): Promise<BlockDTO>;
    getBlockByHeight(height: number): Promise<BlockDTO>;
    getStarsByWalletAddress(address: string): Promise<StarDTO[]>;
    validateChain(): Promise<Error[]>;
}

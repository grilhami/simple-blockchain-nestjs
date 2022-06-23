import { BlockDTO, StarDTO } from './dto';
export declare class BlockService {
    data: BlockDTO;
    constructor(data: BlockDTO);
    validate(): Promise<boolean>;
    getBData(): Promise<StarDTO>;
}

export declare class BlockDTO {
    hash: string;
    height: number;
    body: string;
    time: string;
    previousBlockHash: string;
}
export declare class StarOwnershipDTO {
    address: string;
    star: StarDTO;
}
export declare class StarDTO {
    dec: number;
    ra: number;
    story: string;
}
export declare class SubmitStarDTO {
    address: string;
    message: string;
    signature: string;
    star: StarDTO;
}
export declare class AddressDTO {
    address: string;
}

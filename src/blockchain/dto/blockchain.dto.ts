export class BlockDTO {
    // Hash of the block
    hash:string = ""

    // Block Height (consecutive number of each block)
    height:number = 0;
    
    // Will contain the transactions stored in the block, by default it will encode the data
    body:string = "";

    // Timestamp for the Block creation
    time:number = 0;
    
    // Reference to the previous Block Hash
    previousBlockHash:string = "";

}


export class StarDTO {
    // The star's center coordinates
    dec:number = 0;
    ra:number = 0;

    // The star's story
    story:string = "";
}

export class SubmitStarDTO {

    // User wallet address
    address:string;

    // Star Message
    message:string;

    // Signature
    signature:string;

    // Star Name
    star:string;
}


export class OwnershipDTO {
    // User wallet address
    address:string;
}
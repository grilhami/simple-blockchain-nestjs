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
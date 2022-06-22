import {createHash} from "crypto" 

class BaseBlockDTO {
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

export class BlockDTO extends BaseBlockDTO {

    validate() {
        let self = this;
        return new Promise((resolve, reject) => {
            // Check if body is valid hex
            const re: RegExp = /[0-9A-Fa-f]{6}/g

            if (!(re.test(self.body))) {
                reject("Invalid body");
            }

            // Save in auxiliary variable the current block hash
            const currentHash: string = self.hash;

            // Recalculate the hash of the Block
            const block: BaseBlockDTO = {
                hash: "",
                height: self.height,
                body: self.body,
                time: self.time,
                previousBlockHash: self.previousBlockHash
            }

            const newHash: string = createHash("sha256").update(JSON.stringify(block)).digest("hex")

            // Comparing if the hashes changed
            // Returning the Block is not valid
            // Returning the Block is valid

            return resolve(currentHash === newHash);

        });
    }
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
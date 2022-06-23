"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockService = void 0;
const crypto_1 = require("crypto");
class BlockService {
    constructor(data) {
        this.data = data;
    }
    validate() {
        const self = this.data;
        return new Promise((resolve, reject) => {
            const re = /[0-9A-Fa-f]{6}/g;
            if (!(re.test(self.body))) {
                reject("Invalid body");
            }
            const currentHash = self.hash;
            const block = {
                hash: "",
                height: self.height,
                body: self.body,
                time: self.time,
                previousBlockHash: self.previousBlockHash
            };
            const newHash = (0, crypto_1.createHash)("sha256").update(JSON.stringify(block)).digest("hex");
            return resolve(currentHash === newHash);
        });
    }
    getBData() {
        const self = this.data;
        return new Promise((resolve, reject) => {
            if (self.height === 0) {
                reject("Cannot retrieve data of Genesis Block.");
            }
            const hexToAscii = Buffer.from(self.body, "hex").toString();
            const starData = JSON.parse(hexToAscii);
            resolve(starData);
        });
    }
}
exports.BlockService = BlockService;
//# sourceMappingURL=block.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarDTO = exports.BlockDTO = void 0;
class BlockDTO {
    constructor() {
        this.hash = "";
        this.height = 0;
        this.body = "";
        this.time = "";
        this.previousBlockHash = "";
    }
}
exports.BlockDTO = BlockDTO;
class StarDTO {
    constructor() {
        this.dec = 0;
        this.ra = 0;
        this.story = "";
    }
}
exports.StarDTO = StarDTO;
//# sourceMappingURL=block.dto.js.map
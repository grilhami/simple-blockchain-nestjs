"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressDTO = exports.SubmitStarDTO = exports.StarDTO = exports.StarOwnershipDTO = exports.BlockDTO = void 0;
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
class StarOwnershipDTO {
    constructor() {
        this.address = "";
    }
}
exports.StarOwnershipDTO = StarOwnershipDTO;
class StarDTO {
    constructor() {
        this.dec = 0;
        this.ra = 0;
        this.story = "";
    }
}
exports.StarDTO = StarDTO;
class SubmitStarDTO {
}
exports.SubmitStarDTO = SubmitStarDTO;
class AddressDTO {
}
exports.AddressDTO = AddressDTO;
//# sourceMappingURL=blockchain.dto.js.map
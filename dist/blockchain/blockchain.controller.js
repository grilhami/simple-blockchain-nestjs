"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const blockchain_service_1 = require("./blockchain.service");
let BlockchainController = class BlockchainController {
    constructor(blockchainServie) {
        this.blockchainServie = blockchainServie;
    }
    blockByHeight(height) {
        const inputHeight = parseInt(height);
        return this.blockchainServie.getBlockByHeight(inputHeight);
    }
    async requestOwnership(body) {
        return await this.blockchainServie.requestMessageOwnershipVerification(body.address);
    }
    async SUBMITStar(star) {
        return await this.blockchainServie.submitStar(star.address, star.message, star.signature, star.star);
    }
    blockByHash(hash) {
        return this.blockchainServie.getBlockByHash(hash);
    }
    starsByOwner(address) {
        return this.blockchainServie.getStarsByWalletAddress(address);
    }
};
__decorate([
    (0, common_1.Get)("/height/:height"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("height")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlockchainController.prototype, "blockByHeight", null);
__decorate([
    (0, common_1.Post)("/request"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "requestOwnership", null);
__decorate([
    (0, common_1.Post)("/star"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SubmitStarDTO]),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "SUBMITStar", null);
__decorate([
    (0, common_1.Get)("/hash/:hash"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("hash")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlockchainController.prototype, "blockByHash", null);
__decorate([
    (0, common_1.Get)("/:address"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("address")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlockchainController.prototype, "starsByOwner", null);
BlockchainController = __decorate([
    (0, common_1.Controller)('blockchain'),
    __metadata("design:paramtypes", [blockchain_service_1.BlockchainService])
], BlockchainController);
exports.BlockchainController = BlockchainController;
//# sourceMappingURL=blockchain.controller.js.map
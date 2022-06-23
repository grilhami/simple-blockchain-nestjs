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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const block_service_1 = require("../block/block.service");
const bitcoinjs_message_1 = require("bitcoinjs-message");
let BlockchainService = class BlockchainService {
    constructor() {
        this.chain = [];
        this.height = -1;
        this.initializeChain();
    }
    async initializeChain() {
        if (this.height === -1) {
            const block = {
                hash: '',
                height: 0,
                body: "Genesis Block",
                time: "",
                previousBlockHash: ''
            };
            await this._addBlock(block);
        }
    }
    _addBlock(block) {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if (self.chain.length > 0) {
                block.height = self.chain.length;
                block.previousBlockHash = self.chain[self.chain.length - 1].hash;
            }
            block.body = Buffer.from(block.body).toString("hex");
            block.time = new Date().getTime().toString().slice(0, -3);
            const blockStr = JSON.stringify(block);
            block.hash = (0, crypto_1.createHash)("sha256").update(blockStr).digest("hex");
            const blockObj = new block_service_1.BlockService(block);
            const validate = await blockObj.validate();
            if (validate) {
                self.chain.push(block);
                resolve(null);
            }
            reject("Block is not valid");
        });
    }
    getChainHeight() {
        return new Promise((resolve, reject) => {
            resolve(this.height);
        });
    }
    requestMessageOwnershipVerification(address) {
        return new Promise((resolve) => {
            resolve(`${address}:${new Date().getTime().toString().slice(0, -3)}:starRegistry`);
        });
    }
    submitStar(address, message, signature, star) {
        const self = this;
        return new Promise(async (resolve, reject) => {
            const messageTime = parseInt(message.split(':')[1]);
            const currentTime = parseInt(new Date().getTime().toString().slice(0, -3));
            if (currentTime - messageTime > 300) {
                reject("Message is expired");
            }
            const validMessage = (0, bitcoinjs_message_1.verify)(message, address, signature);
            if (validMessage) {
                const starOwnership = {
                    address: address,
                    star,
                };
                const starStr = JSON.stringify(starOwnership);
                const block = {
                    hash: '',
                    height: 0,
                    body: starStr,
                    time: "",
                    previousBlockHash: ''
                };
                await self._addBlock(block);
                resolve(self.chain[self.chain.length - 1]);
            }
        });
    }
    getBlockByHash(hash) {
        const self = this;
        return new Promise((resolve, reject) => {
            const block = self.chain.find(block => block.hash === hash);
            if (block) {
                resolve(block);
            }
            reject("No block found.");
        });
    }
    getBlockByHeight(height) {
        const self = this;
        return new Promise((resolve, reject) => {
            const block = self.chain.find(block => block.height === height);
            if (block) {
                resolve(block);
            }
            reject("No block found.");
        });
    }
    getStarsByWalletAddress(address) {
        const self = this;
        return new Promise((resolve, reject) => {
            let blocks = self.chain.slice(1, -1);
            blocks = blocks.filter(block => Buffer.from(block.body, "hex").toString().includes(address));
            const stars = blocks.map((block) => {
                const hexToAscii = Buffer.from(block.body, "hex").toString();
                const starData = JSON.parse(hexToAscii);
                const star = {
                    dec: starData.star.dec,
                    ra: starData.star.ra,
                    story: starData.star.story,
                };
                return star;
            });
            resolve(stars);
        });
    }
    validateChain() {
        const self = this;
        const errorLogs = [];
        return new Promise((resolve, reject) => {
            self.chain.forEach(async (block, index) => {
                const blockObj = new block_service_1.BlockService(block);
                const validation = await blockObj.validate();
                if (!validation) {
                    const errorLog = new Error(`Block ${block.height} is not valid`);
                    errorLogs.push(errorLog);
                }
            });
            resolve(errorLogs);
        });
    }
};
BlockchainService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BlockchainService);
exports.BlockchainService = BlockchainService;
//# sourceMappingURL=blockchain.service.js.map
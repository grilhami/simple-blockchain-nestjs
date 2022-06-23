# Simple implementation of a private blockchain using Nest JS

This is a simple implementaion of a private blockchain build using Nest JS and TypeScript for my udacity Blockchain Developer Nanodegree program.

The task is:

"Your employer is trying to make a proof of concept on how a Blockchain application can be implemented in his company.

He is an astronomy fan and because of that he spends most of his free time searching stars in the sky, that's why he wants to create a test application that allows him and his friends to register stars, and track the ownership of each."

## How to run

Install the necessary dependencies by running:

`npm install`

To run the program, you can either use `node` by running

`npm start`

or

`node dist/main.js`



## Docs

| Endpoint                   | Method | Description                                                                                                 | Endpoint Example                                                 | Body Example                                                                                                                                                                                                                                                                                                                                                                 | Success Response                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|----------------------------|--------|-------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/blockchain/height/:height` | GET    | Find a specific block my height                                                                             | `/blockchain/height/0`                                             |                                                                                                                                                                                                                                                                                                                                                                              | `{     "hash": "6247020f1399b87ecf57e46e1e42023c9f1bbfc1a33be35592ebae2ba5124083",     "height": 0,     "body": "47656e6573697320426c6f636b",     "time": "1655986452",     "previousBlockHash": "" }`                                                                                                                                                                                                                                                                                           |
| `/blockchain/hash/:hash `    | GET    | Find a specific block by hash                                                                               | `/blockchain/hash/6247020f1399b87ecf57e46e1e42023c9f1bbfc1a33be35592ebae2ba5124083` |                                                                                                                                                                                                                                                                                                                                                                              | `{     "hash": "6247020f1399b87ecf57e46e1e42023c9f1bbfc1a33be35592ebae2ba5124083",     "height": 0,     "body": "47656e6573697320426c6f636b",     "time": "1655986452",     "previousBlockHash": "" }`                                                                                                                                                                                                                                                                                           |
| `/blockchain/:address`       | GET    | Find all the stars related to a wallet address                                                              | `/blockchain/mra85mLKyr14CM7GcCGNVpfGzm9zh18f5J`                   |                                                                                                                                                                                                                                                                                                                                                                              | `[     {         "dec": "16° 26' 59.5",         "ra": "8h 42m 54.2s",         "story": "The Ladleifs"     },     {         "dec": "16° 26' 59.5",         "ra": "8h 42m 54.2s",         "story": "The Ladleifs"     } ]`                                                                                                                                                                                                                                                                         |
| `/blockchain/request`        | POST   | Make a request to the blockchain to push a  block my submitting wallet address                              | `/blockchain/request`                                              | `{     "address": "mra85mLKyr14CM7GcCGNVpfGzm9zh18f5J" }`                                                                                                                                                                                                                                                                                                                      | `mra85mLKyr14CM7GcCGNVpfGzm9zh18f5J:1655987137:starRegistry`                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `/blockchain/star`           | POST   | Submit star to the blockchain by signing the  message receive from /blockchain/request and star information | `/blockchain/star`                                                 | `{      "address": "mra85mLKyr14CM7GcCGNVpfGzm9zh18f5J",      "signature": "H9WO34T5VvIPJCFPmwiR53T/wVYRKVjXbVEnFgjM0HhwYizAAcpda1gA4vc3rrnFPTti3VunluOhg5gdfvL3YBI=",      "message": "mra85mLKyr14CM7GcCGNVpfGzm9zh18f5J:1655987137:starRegistry",      "star": {          "dec": "16° 26' 59.5",          "ra": "8h 42m 54.2s",          "story": "The Ladleifs"      }  }` | `{     "hash": "fa9f6e6b4487a64ff26fab5546959623569dc354fc4e2ac2d53c7d25c23ebf64",     "height": 3,     "body": "7b2261646472657373223a226d726138356d4c4b79723134434d37476343474e567066477a6d397a68313866354a222c2273746172223a7b22646563223a223136c2b0203236272035392e35222c227261223a2238682034326d2035342e3273222c2273746f7279223a22546865204c61646c65696673227d7d",     "time": "1655987202",     "previousBlockHash": "3806c9be29721ef06c3fdf69054469faa5beea9b85ee78a6d91e94a10e6783dd" }` |

## Changes from the Boilerplate code

When starting this project, we were given a boilerplate code with specific structures and dependencies.

Since this codes us build using Nest JS, here are some changes or modifications that have been made.

### 1. Project Directory Structure

The boiler plate code has a different structure than the Nest JS implementations, thus the tree of the folders are different.

Nest JS follows a specific patterns when it comes to structures where each module usually habe at least a [Module](https://docs.nestjs.com/modules), [Service](https://docs.nestjs.com/providers), and [Controller](https://docs.nestjs.com/controllers) file.

Furthermore, additional files are added to the root folder.

**Boilerplate Code Structure**
```
│   app.js
│   BlockchainController.js
│   package-lock.json
│   package.json
│   README.md
│
└───src
        block.js
        blockchain.js
```

**NestJS Implementation Code Structure**
```
│   .eslintrc.js
│   .gitignore
│   .prettierrc
│   nest-cli.json
│   package-lock.json
│   package.json
│   tsconfig.build.json
│   tsconfig.json
│
└───src
    │   app.controller.ts
    │   app.module.ts
    │   app.service.ts
    │   main.ts
    │
    ├───block
    │   │   block.module.ts
    │   │   block.service.ts
    │   │
    │   └───dto
    │           block.dto.ts
    │           index.ts
    │
    └───blockchain
        │   blockchain.controller.ts
        │   blockchain.module.ts
        │   blockchain.service.ts
        │
        └───dto
                blockchain.dto.ts
                index.ts
```

### 2. Packages

The course recommends the following packages for the boilerplate code implementations:
- `bitcoinjs-lib`
- `bitcoinjs-message`
- `body-parser`
- `crypto-js`
- `express`
- `hex2ascii`
- `morgan`

Some of the packages are either not included or subtituted in the Nest JS implementation. The only packages that were added are `bitcoinjs-lib` and `bitcoinjs-message`.

`express` and `body-parser` are not included because they are already natively supported by Nest JS. Check https://docs.nestjs.com/ for further details. `morgan` is also excluded since Nest JS already has its own logging support.

`crypto-js`'s SHA256 hashing function is subtituted with Node JS built-in `crypto` library using `createHash` since both yields the same result.

The following implementation

```
import CryptoJS from `crypto-js`;

const data = ...

CryptoJS.SHA256(JSON.stringify(data))

```

is subtituted with the following implementations using `crypto` library

```
import { createHash } from `crypto`;

const data = ...

createHash("sha256").update(JSON.stringify(data)).digest("hex")

```
`hex2ascii` is subtituted with Node JS built-in `Buffer` since both yields the same result.

The following implementation

```
import hex2Ascii from `crypto-js`;

const hex = ...

hex2Ascii(hex)

```

is subtituted with the following implementations using `Buffer` 

```
const hex = ...

Buffer.from(hex, "hex").toString()
```


### 3. `block.js` implementation

The data and metadata related to a specifc block is handled by the `Block` class implemented in the `src/block.js` file of the boilerplate code.

On the other hand, in the Nest JS implementation, block is handled by the `BlockDTO` and `BlockService` classes.

`BlockDTO` in `src/block/dto/block.dto.ts` file will handle the typing of the block information, which involves the following properties:
- `hash`
- `height`
- `body`
- `time`
- `previousHash`

`BlockService` in `src/block/block.service.ts` will take an argument of `BlockDTO` type and implement validation (`validate()`) and getting the block data (`getBData()`).

### 4. `blockchain.js` implementation

To keep track of all the linking blocks, the boilerplate code implements the `Blockchain` class in `src/blockchain.js` file.

In the Nest JS implementation, the `Blockchain` class is reimplemented as `BlockchainService` class in `src/blockchain/blockchain.service.ts` while keeping all of the methods and attributes similar.

### 5. `blockchainController.js` implementation

To accept incoming request to the private blockchain, the boilerplate code implements the `BlockchainController` class in `src/blockchainController.js` file.

In the Nest JS implementation, the `BlockchainController` class is reimplemented as `BlockchainService` class in `src/blockchain/blockchain.controller.ts` while keeping all of the methods and attributes similar.

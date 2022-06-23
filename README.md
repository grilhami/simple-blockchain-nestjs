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
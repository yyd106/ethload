# How to Start

## Enviroment
MacOS/Linux
geth@1.8.1;
npm@6.4.0;
web3@1.0.0-beta.35;
keythereum@1.0.4
ethereumjs-tx@1.3.7

## Steps to test

### 1 create teting accounts

```sh createAccounts.sh [Account Number]```
Replace [Account Number] as how many transactions you want to send at one time.

### 2 Setup config items

Open config.js and fill in your config items

```
    HttpProvider: "Your RPC IP:PORT",
    BaseAccount : "Your Coin Base",
    BasePrivateKey : "Private key of your coin base",
    GasPrice : "Your Gas Price",
    GasLimit: "Your Gas Limit",
    TestingFund: [Amount to prefund to your testing accounts],
    TestingAccountNumber : [The Account Number you put in step1],
```

For example:

```
    HttpProvider: "http://127.0.0.1:8001",
    BaseAccount : "0x7f479459145dff799d5d796a2f8e98f907fc93e3",
    BasePrivateKey : "6b655ab128f9757ed72ff58aa04a7e04c65c1191932732ef6614fb5ae603a6c0",
    GasPrice : 2,
    GasLimit: 4000000,
    TestingFund: 100000000,
    TestingAccountNumber : 100,
```

### 3 Extra testing accounts and private keys

Run script ExtractAccount.js to get private keys from new created accounts and store them in account.txt
```node ExtractAccount.js```

### 4 Start to test

Run script LoadTest.js and the console log will reflect the thime of starting and ending of the test.

```node LoadTest.js```

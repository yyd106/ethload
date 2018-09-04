Web3 = require("web3");
fs = require("fs")
EthereumTx = require('ethereumjs-tx')
config = require('./config')

var web3 = new Web3(new Web3.providers.HttpProvider(config.HttpProvider));

function sendTransaction(fromAccount, fromAccountPk, toAccount, nonce, amount){
    var privateKey = new Buffer(fromAccountPk, 'hex');
	var tx = new EthereumTx({
		    from: fromAccount,
		    to: toAccount,
	        nonce: nonce,
	        gasPrice: config.GasPrice,
	        gasLimit: config.GasLimit,
	        value: amount,
	    });
    tx.sign(privateKey)
    var raw = '0x' + tx.serialize().toString('hex');
    var p = new Promise(function (resolve, reject) {
	web3.eth.sendSignedTransaction(raw, function (err, transactionHash) {
	    }).on('receipt', function(){
            var end = new Date();
            //console.log("Account " + toAccount + " Receipt!");
            resolve(end);
        } );  
    });
    return p;
}


function prefundTo(){
    var p = new Promise(function (resolve, reject) {
    web3.eth.getTransactionCount(config.BaseAccount, function (err, nonce) {  
        var currentNonce = nonce;
        var lineReader = require('readline').createInterface({
            input: fs.createReadStream('account.txt')
        });
        var promiseArr = [];
        lineReader.on('line', function (line) {
            if(line !=""){
                var toAccount = line.split(" ")[0];
                var pTemp = sendTransaction(config.BaseAccount, config.BasePrivateKey, toAccount, currentNonce, config.TestingFund);
                promiseArr.push(pTemp);
                currentNonce ++;
            }
        });
        var startPrefundTime = new Date;
        console.log("Start Prefund Time: " + startPrefundTime);
        lineReader.on('close', function(){
            Promise.all(promiseArr).then(
                function(){
                    var endPrefundTime = new Date;
                    console.log("End Prefund Time: " + endPrefundTime);
                    resolve();
                }
            )
        })
           
    });
    }) 
    return p;
}
    
function generateAccountArray(){
    var lineReader = require('readline').createInterface({
        input: fs.createReadStream('account.txt')
    });
    var twoDArray = new Array();
    lineReader.on('line', function (line) {
        if(line !=""){
            var from = line.split(" ");
            twoDArray.push(from);
        }
    });
    var p = new Promise(function (resolve, reject) {
        lineReader.on('close', function () {
        resolve(twoDArray);
        });
    });
    return p;
}

function giveGasTo(twoDArray){
    web3.eth.getTransactionCount(twoDArray[0][0], function (err, nonce) {  
        var baseToAccountStr = config.BaseAccount.substr(0, 38);
        var baseToAccountInt = 1111;
        var start = new Date();
        //console.log(twoDArray);
        console.log("Test Start Time: " + start);
        var promiseArr = [];
        twoDArray.forEach(function(from){
            var fromAccount = from[0];
            var fromAccountPk = from[1]; 
            var toAccount = baseToAccountStr + baseToAccountInt;
            var pTemp = sendTransaction(fromAccount,fromAccountPk, toAccount, nonce, config.TestingFund)
            promiseArr.push(pTemp);
            baseToAccountInt ++;
        });
        Promise.all(promiseArr).then(
            function(){
                var endTestTime = new Date;
                console.log("End Test Time: " + endTestTime);
            }
        )
    });
}

prefundTo().then(value => {
    return generateAccountArray();
}).then(twoDArray => {
    giveGasTo(twoDArray)
})

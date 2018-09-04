var fs = require("fs")
var keyth=require('keythereum')
var config = require('./config')

var dirPath = process.cwd();  

function extractAccount(i){
    fs.readdir(dirPath + "/AllAccounts/node" + i + "/keystore", function(err,list){
        if(err) throw err;
        var keyStoreName = dirPath + "/AllAccounts/node" + i + "/keystore/" + list[0];
        fs.readFile(keyStoreName, function(err,data){
            if (!err) {
                var account = JSON.parse(data).address;    
                var keyobj=keyth.importFromFile('0x' + account, "./AllAccounts/node" + i);
                var privateKey=keyth.recover('yudayanx',keyobj); //this takes a few seconds to finish
                fs.writeFile('account.txt', "\n"  + keyth.privateKeyToAddress(privateKey) + " " + privateKey.toString('hex'), {
                    flag: 'a'
                }, function(err){
                if(err) throw err;
            });
            } else {
                console.log(err);
            }
        });
    });
}

for(var i = 0; i < config.TestingAccountNumber; i++){
    extractAccount(i)
}


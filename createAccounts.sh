#!/bin/sh
for (( i = 0; i < $1; i++)); do
    geth --datadir AllAccounts/node$i/ --password "password.txt"  account new
done
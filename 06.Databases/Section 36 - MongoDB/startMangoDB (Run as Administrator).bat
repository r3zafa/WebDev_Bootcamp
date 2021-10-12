
@echo off

cd "C:\MongoDB\bin\"
start mongod.exe
timeout 4
start mongo.exe
exit 
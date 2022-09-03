#!/bin/bash
## assumes quicksilver folder exists alongside this folder, ts-proto extention is installed, and protoc exists locally! tested with libprotoc 3.15.8

protoc   --plugin="./node_modules/.bin/protoc-gen-ts_proto"   --ts_proto_out="./src/utils/protodefs"   --proto_path="../quicksilver/proto/"  --proto_path=../quicksilver/third_party/proto/  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=true"   ../quicksilver/proto/quicksilver/interchainstaking/v1/messages.proto ../quicksilver/proto/quicksilver/airdrop/v1/messages.proto  ../quicksilver/proto/quicksilver/participationrewards/v1/messages.proto


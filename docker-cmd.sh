#!/bin/bash
mkdir -p /usr/volumns/src
cp -rf /usr/volumns/src/* /usr/src/app

#npm start
npm run build
node dist/server/index.js

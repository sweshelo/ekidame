#!/bin/bash
if [ -n './node_modules/' ]; then

    if [ ! `node -v | grep -o 'v[0-9\.]*'`] || [ ! `npm -v | grep -o '[0-9\.]*'` ] ;then
        echo 'Installing nodejs and npm ...'
        sudo apt update && sudo apt install nodejs npm
    fi

    echo 'Installing node modules ...'
    npm init -y
    npm install babel-cli@6 babel-preset-react-app@3
fi

npx babel --watch src --out-dir . --presets react-app/prod

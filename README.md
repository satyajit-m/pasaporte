# Pasaporte - Passport Automation System

This is a sample app demonstrating simple passport automation process.

1. The front-end JS App, which uses React & ReactHooks is contained in `client` directory 
1. A custom backend server, written in Node. The code for this is in the `server` directory.




## Overview
To run this app, you will need to create a TrueVault trial account for the sample app to interact with live. You will also need to run a Postgres database locally and run a setup script that populates data in TrueVault and Postgres. Finally you will need to run the Node app and React app servers locally using the config file generated by the setup script.

Once you can run the sample app locally, we recommend exploring the UI to get a feel for the sample product, then peeking at the source to see how TrueVault fits in. 

## Running the App

*Note:* This app has only been tested using the latest version of Chrome.

### Pre-reqs
1. NodeJS and npm
2. PostgresSQL


### Run Node Server
1. Change into the server directory: `cd server`
2. Run the node server: `nodemon`. 


### Run Client Server
1. Change into the server directory: `cd client`
2. Run `npm start` to launch the development server. This command should automatically open a new tab or window in your default web browser. This tab will automatically refresh whenever you make changes to source code.


## License

This sample app is released under the [MIT](LICENSE)
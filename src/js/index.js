// import { } from 'dotenv/config';
import Provider from './provider.js';
import WalletHandler from './walletHandler.js';
import Signer from './signer.js';
import Transaction from './transaction.js';

// Setting variables with environment values
const walletAddress = process.env.WALLET_ADDRESS;
const nodeURL = process.env.NODE_URL;
const secret = process.env.WALLET_SECRET_KEY;
const walletAddressTo = process.env.WALLET_ADDRESS_TO;
const amount = process.env.AMOUNT;

export class App {
    constructor(){
        this.form = document.querySelector('#form');
        this.fromWalletAddress = document.querySelector('#fromWalletAddress');
        this.toWalletAddress = document.querySelector('#toWalletAddress');
        this.amount = document.querySelector('#amount');
    }

    async runApp(){
        this.processHandler();
        try{
            // discomment below lines to have the transactions processed
            // const providerConnected = await this.providerConnection(nodeURL);
            // await this.walletProcessing(providerConnected, walletAddress);
            // const walletSigner = await this.signerConnection(secret, providerConnected);
            // await this.transactionProcessing(walletSigner);
        }catch(err){
            console.log(err);
        }
    }

    processHandler(){
        this.form.addEventListener('submit', event => {
            event.preventDefault();
        })
    }
    
    
    // Calling Provider class to stablish connection to the network
    async providerConnection(nodeURL){
        const provider = new Provider(nodeURL);
        const providerConnected = await provider.blockchainConnection();  
        return providerConnected;
    }
    
    async walletProcessing(providerConnected, walletAddress){
        if(!providerConnected) return;
        try{    
            const walletHandler = new WalletHandler(providerConnected, walletAddress);
            
            // get wallet balance
            const walletBalanceWEI = await walletHandler.getWalletBalance();
            console.log(`Wallet balance in WEI: ${walletBalanceWEI}`);
    
            // get wallet balance in ETH
            const walletBalanceETH = walletHandler.convertWalletBalanceToETH(walletBalanceWEI);
            console.log(`Wallet balance in ETH: ${walletBalanceETH}`);
        }catch(err){
            console.log(err);
        };
        return;
    }
    
    async signerConnection(secret, providerConnected){
        // New instance of signer
        const signer = new Signer();
        try{
            // create new signer
            const walletSigner = await signer.setSigner(secret, providerConnected);
            console.log(`Signer: ${signer}`);
    
            return walletSigner;
        }catch(err){
            console.log(err);
        }
    }

    async transactionProcessing(walletSigner){

    
        const tx = new Transaction(walletSigner, walletAddressTo, amount);
    
        const transaction = await tx.createTransaction();
        console.log(`Transaction: ${transaction}`);
            
        // Often you may wish to wait until the transaction is mined
        const receipt = await transaction.wait();
        console.log(receipt);
    }
}

const app = new App();
app.runApp();

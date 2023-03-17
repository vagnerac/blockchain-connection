import {ethers} from 'ethers';

export default class Signer{
    constructor(){}
    
    setSigner(secret, providerConnected){
        // parameters to define the signer to transactions and messages
        const wallet = new ethers.Wallet(secret);
        // connect the wallet to the provider
        const signer = wallet.connect(providerConnected);
        return signer;
    }

}

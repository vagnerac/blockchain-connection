import { ethers } from "ethers";

export default class WalletHandler {
    constructor(
        providerConnected, walletAddress
    ){
        this.providerConnected = providerConnected;
        this.walletAddress = walletAddress;
    }
    //Get balance in WEI
    async getWalletBalance(){    
        const walletBalanceWEI = await this.providerConnected.getBalance(this.walletAddress);
        return walletBalanceWEI;
    }
    // Converted balance to ETH
    convertWalletBalanceToETH(walletBalance){
        const walletBalanceETH = ethers.formatEther(walletBalance);
        return walletBalanceETH;
    };
    // Get last nonce
    async lastNonce(){
        const lastNonce = await this.providerConnected.getTransactionCount(this.walletAddress);
        return lastNonce;
    }


}
//const ethers = require('ethers');
import { ethers } from "ethers";


export default class Provider {
    constructor(
        nodeURL
    ){
        this.nodeURL = nodeURL;
    }
    
    async blockchainConnection(){
        try{
            if(this.nodeURL){
                const provider = ethers.getDefaultProvider(this.nodeURL);
                const network = await provider.getNetwork();

                if(network.name === process.env.NETWORK_NAME){
                    console.log(`Connected to ${network.name} provider`);
                }else{
                    console.log('Connection fail');
                }
                return provider;
            }
        }catch(err){
        console.log('Erro na conexão com a rede.');
        return;
        }
    }
}
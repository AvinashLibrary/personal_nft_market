import React, { Component } from 'react';
import ethers from 'ethers';
import './HomePage.css';
import  Web3Modal from 'web3modal';

import addressess from '../../environment/contract-address.json';

import NFT from '../../artifacts/contracts/NFT.sol/NFT.json';
import NFTMarket from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

import axios from 'axios'

export default class HomePage extends Component {

    constructor() {
        super()
        this.state = {
            nfts: [],
            dummyText: "Checking Text",
            loadingState: "not-loaded"
        }
    }
    componentDidMount() {
        this.setState({ dummyText: 'its Working' });
    }

    async loadNft() {
        const provider = new ethers.provider.JsonRpcProvider();
        const tokenContract = new ethers.Contract(addressess["NFT"], NFT.abi, provider);
        const marketContract = new ethers.Contract(addressess["NFTMarket"], NFTMarket.abi, provider);

        const data = await marketContract.fetchMarketItems();

        const items = await Promise.all(data.map(async i => {
            const tokenUri = await tokenContract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri);
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether');

            let item = {
                price,
                tokenId: i.tokenId.toString(),
                seller:i.seller,
                owner:i.owner,
                image:meta.data.image,
                name:meta.data.name,
                description:meta.data.description
            }

            return item;

        }));

        this.setState({nfts:items,loadingState:"loaded"})

    }

    async buyNft(nft){
        const web3Modal =  new Web3Modal();
        const connnection = await web3Modal.connect();
        const  provider =  new ethers.providers.Web3Provider(connnection);

        const signer  = provider.getSigner();
        const contract = new ethers.Contract(addressess.NFTMarket,NFTMarket.abi,signer);
        const price = ethers.utils.parseUnits(nft.price.toString(),'ether');


        const transaction = await contract.createMarketSale(addressess.NFT,nft.tokenId,{value:price})
    
        await transaction.wait()
        this.loadNft()
    }





    render() {



        return (
            <div className="textFormatter">

                <div >
                    {this.state.dummyText}
                </div>



            </div>
        )

    }
}

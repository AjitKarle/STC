import React, {Component} from 'react';
import { Jumbotron } from 'react-bootstrap';
import { stcContract } from '../ethereum/getContracts';
import NftCard from './NftCard';
import SearchLogic from './SearchLogic';

class MarketPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: null,
            ids: [],
            nfts: null
        }
    }
    async componentDidMount() {
        const account = (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0];
        this.setState({ account });

        const ids = await stcContract.methods.onSaleNFTs().call()
        this.setState({ ids })

        const nfts = ids.map(id => {
            return <NftCard view="market" id={id.toString()} key={id} />
        })
        this.setState({ nfts })
    }
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="text-center">Marketplace</h1>
                    <p className="text-center">View and buy assignments!</p>
                </Jumbotron>
                <SearchLogic></SearchLogic>
                <div className="container">
                    {this.state.ids.length > 0 ? this.state.nfts : <h3 className="text-center">No NFTs on sale. Go to the <a href="/kitchen">kitchen</a> to mint your first NFT!</h3>}
                </div>
            </div>
        )
    }
}
export default MarketPlace;
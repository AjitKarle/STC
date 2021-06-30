import React, {Component} from 'react';
import { Jumbotron } from 'react-bootstrap';
import { stcContract } from '../ethereum/getContracts';
import NftCard from './NftCard';

class StudyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: null,
            ids: [],
            myNfts: null
        }
    }
    async componentDidMount() {
      const account = (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0];
      this.setState({ account });

      const ids = await stcContract.methods.owned_NFTs().call({ from: account })
      this.setState({ ids })

      const myNfts = ids.map(id => {
        return <NftCard view="dining" id={id.toString()} key={id} />
      })
      this.setState({ myNfts })
    }

    render() {
      return (
        <div>
          <Jumbotron>
            <h1 className="text-center">Study Table</h1>
            <p className="text-center">View all your assignments here!</p>
          </Jumbotron>
          <div className="container">
            {this.state.ids.length > 0 ? this.state.myNfts : <h3 className="text-center">No NFTs found. Go to the <a href="/mintNFT">mintNFT section</a> to mint your first NFT!</h3>}
          </div>
        </div>
      )
    }
}

export default StudyTable;
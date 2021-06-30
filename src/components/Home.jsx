import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { stcContract } from '../ethereum/getContracts';
import STC from '../abis/STC.json';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name_stc: '',
            symbol_stc: '',
            totalSupply: '',
            owner_stc: ''
        }
    }
    
  async componentDidMount() {
    let stcContract;
    await this.loadBlockchainData(stcContract);
    
    /* this.setState({
        name_stc: await stcContract.methods.name().call(),
        symbol_stc: await stcContract.methods.symbol().call(),
        totalSupply: (await stcContract.methods.totalSupply().call()).toString(),
        owner_stc: await stcContract.methods.owner().call()
      }); */
    }
    async loadBlockchainData(contract) {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()

    const networkId = await web3.eth.net.getId()
    const networkData = STC.networks[networkId]
    if(networkData) {
      const abi = STC.abi
      const address = networkData.address
      contract = new web3.eth.Contract(abi, address)
      // const totalSupply = await contract.methods.totalSupply().call()
      // this.setState({ totalSupply })
      // Load Tokens
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }
    render() {
        return (
            <div>
              <Jumbotron>
                <h1 className="text-center">Welcome to the Marketplace!</h1>
              </Jumbotron>
              <div className="container">
                <div className="row">
                  <div className="col-4">
                    <h1 className="text-center">STC Info</h1>
                  <ol className="list-group"> {/*
                      <li className="list-group-item">Name: <strong>{this.state.name_stc ? this.state.name_stc : (<i class="fas fa-spinner"></i>)}</strong></li>
                      <li className="list-group-item">Symbol: <strong>{this.state.symbol_stc ? this.state.symbol_stc : (<i class="fas fa-spinner"></i>)}</strong></li>
                      <li className="list-group-item">Address: <strong>{stcContract.address ? stcContract.address : stcContract._address}</strong></li>
                      <li className="list-group-item">Owner: <strong>{this.state.owner_stc ? this.state.owner_stc : (<i class="fas fa-spinner"></i>)}</strong></li>
                  */}</ol>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default Home;
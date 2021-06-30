import React, {Component} from 'react';
import web3 from '../ethereum/getWeb3';
import ipfs from '../ethereum/getIpfs';
import { Jumbotron, Button } from 'react-bootstrap';
import { stcContract } from '../ethereum/getContracts';

class MintNFT extends Component {
    constructor(props) {
        super(props);
        this.state = {
          account: null,
          name: "",
          description: "",
          mintingCost: "",
          buffer: "",
          imageHash: "",
          nftMetadata: "",
          approved: false
        }

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    async componentDidMount() {
        const account = (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0];
        this.setState({ account });
    }

    mint = () => {
        stcContract.methods.mintNFT(
            this.state.imageHash, 
            this.state.nftMetadata
        )
        .send({ from: this.state.account })
        .once('receipt', (receipt) => {
            if (receipt !== undefined)
              window.alert('Mint successful!')
            else
              window.alert('Mint failed')
          })
    }

    convertToBuffer = async (reader) => {
        const buffer = await Buffer.from(reader.result);
        this.setState({buffer});
}   ;

    captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)
      };

    onSubmitForMetadata = async (name, desc)=> {
        const ipfsmeta = {}
        ipfsmeta.name = name;
        ipfsmeta.description = desc;
        ipfsmeta.imageHash = this.state.imageHash;
        ipfsmeta.specialFeature = Math.random();
        const ipfsHash = await ipfks.add(Buffer.from(JSON.stringify(ipfsmeta)))
        this.setState({ nftMetadata: ipfsHash.path });
    }

    handleOnSubmit = async (name, desc) => {
        try {
        const ipfsHash = await ipfs.add(this.state.buffer)
        this.setState({ imageHash: ipfsHash.path });
        } catch (error) {
            console.log(error)
            window.alert("Upload failed")
        }
        await this.onSubmitForMetadata(name, desc);
    };

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="text-center">Mint NFT</h1>
                    <p className="text-center">Convert your assignments to NFTs here! </p>
                </Jumbotron>
                <div className="container">
                    <form onSubmit={async (event) => {
                        event.preventDefault()
                        const name = this.name.value
                        const desc = this.desc.value
                        await this.handleOnSubmit(name, desc)
                        this.mint()
                    }}>
                        <div className="row">
                            <div className="col-6 text-center">
                                <h1 className="mb-5">Details</h1>
                                <p className="m-5">
                                    {/* <form onSubmit={this.handleOnSubmit}> */}
                                        <p>
                                            <label for="name">Enter NFT name:</label> &nbsp;
                                            <input type='text' name="name" className='p-1' ref={(input) => this.name = input} value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} placeholder='e.g. _Name'></input>
                                        </p>
                                        <p>
                                            <label for="desc">Enter NFT description:</label> &nbsp;
                                            <input type='text' name="desc" className='p-1' ref={(input) => this.desc = input} value={this.state.description} onChange={(event) => this.setState({ description: event.target.value })} placeholder='e.g. _Desc'></input>
                                        </p>
                                        <p>
                                            <label for="image">NFT image:</label> &nbsp;
                                            <input type='file' name="image" onChange={this.captureFile}></input>
                                        </p>
                                        {/* <input type='submit' className='btn btn-warning mt-5' value='Upload'></input>
                                    </form> */}
                                </p>
                            </div>
                            <div className="col-6 text-center">
                                <h1 className="mb-5">Mint </h1>
                                    {/* <p>
                                    <label for="userPays">Enter userPays:</label> &nbsp;
                                    <input type='text' className='p-1' name="userPays" placeholder='e.g. _UserPays' ref={(input) => { this.userPays = input }}></input>
                                    </p> */}
                                    <input type='submit' className='btn btn-info mt-5' value="Mint"></input>
                            </div>
                        </div>
                        <div className="row mt-5 text-center">
                            <p className="m-5">
                                {this.state.imageHash !== "" ? (
                                    <h3>Image uploaded: <a href={"https://ipfs.infura.io/ipfs/" + this.state.imageHash}>View</a></h3>
                                ): ""}
                            </p>
                            <p className="m-5">
                                {this.state.nftMetadata !== "" ? (
                                    <h3>Metadata uploaded: <a href={"https://ipfs.infura.io/ipfs/" + this.state.nftMetadata}>View</a></h3>
                                ): ""}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default mintNFT;
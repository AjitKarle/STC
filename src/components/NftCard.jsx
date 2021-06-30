import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import web3 from '../ethereum/getWeb3';
import { erc721Contract } from '../ethereum/getContracts';

class NftCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account: null,
            owner: null,
            price: "",
            onSale: null,
            metadata: null,
            name: null,
            description: null,
            hash: null,
            isOwner: null
        }
    }

    async componentDidMount() {
        const account = (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0];
        this.setState({ account })

        const info = await erc721Contract.methods.NFT_details(this.props.id).call();

        this.setState({
            owner: info[0],
            price: info[1].toString(),
            onSale: info[2],
            metadata: info[3],
            hash: info[4]
        })

        const res = await fetch(`https://ipfs.infura.io/ipfs/${info[3]}`)
        const data = await res.json();

        this.setState({ name: data.name, description: data.description })

        const owner = await erc721Contract.methods.ownerOf(this.props.id).call()
        const isOwner = account.toLowerCase() === owner.toLowerCase()

        this.setState({ isOwner })
    }

    onApprove = async () => {
        const address = window.prompt("Enter address to approve:", "")
        try {
            await erc721Contract.methods.approve(address, this.props.id).send({
                from: this.state.account
              })

              window.alert("Txn successful")
        } catch (error) {
            console.log(error)
            window.alert("Txn failed")
        }
    }
    approve = (
        <Button variant="primary" onClick={this.onApprove}>Approve</Button>
    );

    onBurn = async () => {
        window.alert("Burning NFT is irreversible. Are you sure?")
        try {
            await erc721Contract.methods.burnNFT(this.props.id).send({
                from: this.state.account
            })

            window.alert("Txn successful");
        } catch (error) {
            console.log(error)
            window.alert("Txn failed");
        }
    }
    burn = (
        <Button variant="danger" onClick={this.onBurn}>Burn</Button>
    )

    onGift = async () => {
        const address = window.prompt("Gift NFT to:", "")
        window.alert(`Gifting NFT will transfer ownership to ${address}`)
        try {
            await erc721Contract.methods.giftNFT(address, this.props.id)
                .send({ from: this.state.account })

            window.alert("Txn successful");
        } catch (error) {
            console.log(error)
            window.alert("Txn failed");
        }
    }
    gift = (
        <Button variant="success" onClick={this.onGift}>Gift</Button>
    )

    onPutSale = async () => {
        window.alert("This will allow others to buy your NFT. Are you sure?")
        const price = window.prompt("Set a price:", "0")
        try {
            await erc721Contract.methods.setPricePutOnSale(this.props.id, web3.utils.toWei(price))
        .send({ from: this.state.account })

        window.location.reload()    
        // window.alert("Txn successful");
        } catch (error) {
            console.log(error)
            window.alert("Txn failed");
        }
    }
    putSale = (
        <Button variant="info" onClick={this.onPutSale}>Put on sale</Button>
    )

    onRemoveSale = async () => {
        window.alert("This will remove your NFT from sale. Are you sure?")
        try {
            await erc721Contract.methods.stopSale(this.props.id)
        .send({ from: this.state.account })

            window.alert("Txn successful");
        } catch (error) {
            console.log(error)
            window.alert("Txn failed");
        }
    }
    removeSale = (
        <Button variant="warning" onClick={this.onRemoveSale}>Remove from sale</Button>
    )

    onBuy = async () => {
        window.alert(`This will deduct ${web3.utils.fromWei(this.state.price, "ether")} RECD tokens from your wallet. Are you sure?`)
        try {
            await erc721Contract.methods.buyAtSale(this.state.account, this.state.price).send({
                from: this.state.account
              })
              window.alert("Txn successful")
        } catch (error) {
            console.log(error)
            window.alert("Txn failed")
        }
    }
    buy = (
        <Button variant="success" onClick={this.onBuy}>Buy</Button>
    )

    render() {
        return (
            <div className="text-center m-3">
                <Card style={{width: 500, margin: "auto"}}>
                    <Card.Header>
                        <div className="row">
                            <div className="col-2 mt-auto">
                                <h5><span data-toggle="tooltip" data-placement="left" data-delay="100" data-trigger="click hover focus" title={"NFT ID " + this.props.id}><i class="fas fa-fingerprint"></i> {this.props.id}</span></h5>
                            </div>
                            <div className="col-8 mr-auto">
                                <div className="row">
                                <h3><i class="fas fa-signature"></i> {this.state.name}</h3>
                                </div>
                            </div>
                            <div className="col-2 mt-auto">
                                <h5><span data-toggle="tooltip" data-placement="right" data-delay="100" data-trigger="click hover focus" title={this.state.description}><i class="fas fa-info-circle"></i></span></h5>
                            </div>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <img
                            src={"https://ipfs.fleek.co/ipfs/" + this.state.hash} 
                            alt={"NFT " + this.props.id} 
                            width="200"
                            height="200"
                        />
                    </Card.Body>
                    <Card.Footer>
                        {this.props.view === "dining" && !this.state.onSale && this.approve} &nbsp;
                        {this.props.view === "dining" && !this.state.onSale && this.gift} &nbsp;
                        {this.props.view === "dining" && !this.state.onSale && this.burn} &nbsp;
                        {this.props.view === "dining" ? (this.state.onSale ? this.removeSale : this.putSale) : null}
                        {this.props.view === "market" ? (this.state.isOwner ? this.removeSale : (<span>{this.buy} &nbsp; {web3.utils.fromWei(this.state.price, "ether")} RCED</span>)) : null}                    
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}

export default NftCard;
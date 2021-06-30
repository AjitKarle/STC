const web3 = require('./getWeb3');
import STC from '../abis/STC.json';

let stcContract;
async () => {
    const networkId = await web3.eth.net.getId()
    const networkData = STC.networks[networkId]

    if (networkData) {
        const abi = STC.abi
        const address = networkData.address
        stcContract = new web3.eth.Contract(abi, address)
    }
}
module.exports = stcContract

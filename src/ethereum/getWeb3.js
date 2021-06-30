const Web3 = require('web3');

if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
} else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
} else {
    window.web3 = new Web3('http://localhost:8545');
}

module.exports = window.web3;

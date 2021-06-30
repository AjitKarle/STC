// const HDWalletProvider = require('@truffle/hdwallet-provider');
// require("dotenv").config();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }/*,
    ropsten: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC, 
        process.env.ROPSTEN_RPC_URL
      ),
      network_id: 3
    },

    rinkeby: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC,
        process.env.RINKEBY_RPC_URL
      ),
      network_id: 4
    },

    goerli: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC,
        process.env.GOERLI_RPC_URL
      ),
      network_id: 5
    },

    kovan: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC,
        process.env.KOVAN_RPC_URL
      ),
      network_id: 42
    },

    matic_testnet: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC,
        process.env.MATIC_RPC_URL
      ),
      network_id: 80001
    }*/
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.8.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}

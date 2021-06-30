const { create } = require('ipfs-http-client');
const client = create('https://ipfs.infura.io:5001');

export default client;

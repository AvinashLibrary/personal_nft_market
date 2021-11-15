require('@nomiclabs/hardhat-waffle');
const secret = require('./environment/secret.json');
module.exports = {
  solidity: "0.8.4",
  paths: {
    sources: './blockchain/contracts',
    tests: './blockchain/test',
    cache: './blockchain/scripts',
    artifacts: './blockchain/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: secret.mumbaiNode,
      accounts: [secret.privateKey]
    }
  }
};
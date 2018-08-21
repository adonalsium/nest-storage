var NestStorage = artifacts.require('./NestStorage.sol');

module.exports = function(deployer) {
    deployer.deploy(NestStorage, {gas: 5000000});
  };
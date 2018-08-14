var ProtectedEthContainer = artifacts.require('./ProtectedEthContainer.sol');

module.exports = function(deployer) {
    deployer.deploy(ProtectedEthContainer);
  };
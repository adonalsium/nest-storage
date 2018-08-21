pragma solidity ^0.4.23;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/NestStorageRegistry.sol";
import "../contracts/GatedContainer.sol";

contract TestNestStorageRegistry {
  // Truffle will send the TestContract one Ether after deploying the contract.
  uint public initialBalance = 1 ether;

  function testAddGatedContainerForUser() public {
    NestStorageRegistry containerRegistry = NestStorageRegistry(DeployedAddresses.NestStorageRegistry());
    containerRegistry.addGatedContainerForSender();

    address[] memory containers = containerRegistry.getGatedContainersForUser(address(this));
    GatedContainer container = GatedContainer(containers[0]);
    uint len = containers.length;
    Assert.equal(len, 1, "User sould have 1 GatedContainer.");
    address owner = container.owner();
    Assert.equal(owner, address(this), "User should own the GatedContainer");
  }
}
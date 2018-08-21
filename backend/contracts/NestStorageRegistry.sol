pragma solidity ^0.4.23;

import "./GatedContainer.sol";

/// @title A registry for GatedContainers used in the Nest Storage Application
/// @author Huma Dadachanji and Jake Martin
/// @notice This contract holds the mapping from accounts to the containers
///           they own
contract NestStorageRegistry {

  // Mapping of ethereum accounts to the GatedContainers they own
  mapping (address => address[]) public registry;

  ///@notice deploys new GatedContainer for user and adds it's address to the registry
  function addGatedContainerForSender() public {
    // TODO: Require that _GatedContainer is actually a GatedContainer
    //        or change logic so that deployment happens here
    GatedContainer container = new GatedContainer();
    container.transferOwnership(msg.sender);
    registry[msg.sender].push(container);
  }
}
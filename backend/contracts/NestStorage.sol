pragma solidity ^0.4.23;

/* 
 If/when we start using engima, this will become a secret contract.

*/

contract NestStorage {
    address public owner;
    mapping(address => address[]) public registry; //maps users to containers. yeet

    constructor() public {
        owner = msg.sender;
        registry[owner] = [0x085AF49B437CD0cd9318155aFe2Ec8de84b18066, 0xa57e3502CA9a1C04627292203379ad4AAa8436bc];
    }

    function addContainerForUser(address _container) public {
        registry[msg.sender].push(_container);
    }

    function getContainersForUser(address _user) public view returns ( address[] ) {
        return registry[_user];
    }
}
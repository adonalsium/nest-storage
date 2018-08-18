pragma solidity ^0.4.23;

/* 
 If/when we start using engima, this will become a secret contract.

*/

contract NestStorage {
    address public owner;
    mapping(address => address[]) public registry; //maps users to containers. yeet

    constructor() public {
        owner = msg.sender;
        registry[owner] = [0x085AF49B437CD0cd9318155aFe2Ec8de84b18066];
    }

    function addContainerForUser(address container) public {
        registry[msg.sender].push(container);
    }

    function getContainersForUser() public view returns ( address[] ) {
        return registry[msg.sender];
    }
}
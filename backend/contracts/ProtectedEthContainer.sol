pragma solidity ^0.4.23;

contract ProtectedEthContainer {
    address public owner;
    
    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only the owner can perform this action");
        _;
    }

    function () public payable;

    function transfer (address _recipient, uint256 _amount) public onlyOwner {
        // TODO: Add Error Handling
        _recipient.transfer(_amount);
    }

    function getBalance() public view returns ( uint256 ) {
        return address(this).balance;
    }
}
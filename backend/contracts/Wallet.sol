pragma solidity ^0.4.23;

contract Wallet {
    address public owner;
    uint public balance;

    constructor() public {
        owner = msg.sender;
        balance = 0;
    }
}
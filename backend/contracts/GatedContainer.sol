pragma solidity ^0.4.23;

import "./Ownable.sol";


/// @title GatedContainer
/// @author Huma Dadachanji and Jake Martin
/// @notice This is a container for ethereum that can
contract GatedContainer is Ownable {
  uint public tokensSpent; //Tracks tokens spent in current time window
  uint public spendingLimit; //Total amount the contract can spend in a single time window
  uint public timeWindowStart; //Start of the current time window as unix timestamp
  uint public windowLength; //Length of a time window within which spending is limited
  bool public isActive; //Trackers whether or not container is active

  /// @notice Fires upon transaction success after funds have transferred.
  ///           contains the sender, receiver, amount, amount left to spend in
  ///           the current window, and time until window resets
  event TransactionSuccess(
    address from,
    address to,
    uint amountSent,
    uint leftToSpend,
    uint timeToReset
  );

  constructor() public Ownable() {
    tokensSpent = 0;
    // TODO: What's default ether count?
    spendingLimit = 1;
    timeWindowStart = block.timestamp;    
    windowLength = 1 days;
    isActive = true; 
  }

  /// @notice Checks if user is within their spending limit for the given time period.
  /// @param _amount the amount the user wants to spend
  modifier withinLimit(uint _amount) {
    // we believe that block.timestamp is secure enough for our use case                  
    if (!withinWindow()){
      require(
        _amount <= spendingLimit,
        "Transaction Rejected. You're trying to spend " +
        "more in a single transaction than your whole periodic spending limit. You should " +
        "batch this transaction over multiple spending periods.");
    } else {
      require(
        tokensSpent + _amount <= spendingLimit,
        "Transaction Rejected. This " +
        "transaction would place you over your spending limit.");
    }
    _;
  }

  modifier isActive() {
    require(isActive, 
      "This GatedContainer has been deactivated. Please reactivate " +
      "and try again");
  }

  /// @notice Deactivates the GatedContainer.
  /// @dev You can use this to filter out token containers on the client side by
  ///        querying isActive.
  function deactivate() external onlyOwner {
    isActive = false;
  }

  /// @notice Activates the GatedContainer.
  /// @dev You can use this to filter out token containers on the client side by
  ///        querying isActive. 
  function activate() external onlyOwner {
    isActive = true;
  }

  /// @notice Transfers funds to another address. The message sender must be ther owner
  ///           of the container and the amount they want to transfer must be within the
  ///           spending limit.
  /// @dev This function handles the logic of resetting timeWindowStart and tokensSpent                
  /// @param _to the address to tranfer the funds to.
  /// @param _amount the amount ot be transferred  
  function transferTokens(address _to, uint _amount) public onlyOwner isActive withinLimit(_amount) {
    if (block.timestamp - timeWindowStart > windowLength){
      timeWindowStart = block.timestamp;
      tokensSpent = 0;
    }

    _to.transfer(_amount);
    tokensSpent += _amount;

    uint timeToReset = (timeWindowStart + windowLength) - block.timestamp;
    uint leftToSpend = spendingLimit - _amount;
    emit TransactionSuccess(address(this), _to, _amount, leftToSpend, timeToReset);    
  }

  /// @notice Returns true if we are still within the spending window that was
  ///           active during the last transaction
  /// @dev We are currently using block.timestamp but may transition to blockheight
  ///       or a trusted oracle later on.
  /// @return A boolean. True if within window, false otherwise.
  function withinWindow() internal returns(bool) {
    return (block.timestamp - timeWindowStart) < windowLength;
  }

}
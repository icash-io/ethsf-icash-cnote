pragma solidity ^0.4.24;

contract update {
  address company_address;
  uint transactions_num;
  uint users_num;
  uint revenue_num;

  constructor(uint _transactions_num, uint _users_num, uint _revenue_num) public {
      company_address = msg.sender;
      transactions_num = _transactions_num;
      users_num = _users_num;
      revenue_num = _revenue_num;
  }

  function transactions_set() constant public returns (uint) {return transactions_num; }

  function users_set() constant public returns (uint) {return users_num; }
  
  function revenue_set() constant public returns (uint) {return revenue_num; }

  function getBlockNumber() constant public returns (uint) { return block.number; }

  function setTransactions(uint new_transactions_num) public { transactions_num = new_transactions_num; }

  function setUsers(uint new_users_num) public { users_num = new_users_num;}

  function setRevenue(uint new_revenue_num) public { revenue_num= new_revenue_num;}
}

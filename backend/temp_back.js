



const contract = web3.eth.contract(contractAbi);
const contractInstance = contract.at(contractAddress);

const transactionObject = {
  from: fromAccount,
  gas: gasLimit
  gasPrice: gasPriceInWei
};


// Functions/API that we need. 


// Bloom API: Binary check if there is an associated address with account.  Web3
// https://bloom.co/docs/contracts/accounts#address-belongs-to-account
// testnet address: 0xfbc650e80d6796dff3101457eac4af994e4d2062

accountRegistry = AccountRegistry.at("[address of registry contract]")
hasBloomId = accountRegistry.addressBelongsToAccount.call(address)

$("#bloomid").attr("src","./images/bloomID.png"); //jquery call


// DHARMA API 
// https://developer.dharma.io/tutorials/dharma-js


import { Dharma } from "@dharmaprotocol/dharma.js";
const host = "http://localhost:8545";

const provider = window.web3.currentProvider;
const dharma = new Dharma(provider);

// RCN API
// https://github.com/ripio/rcn-network


function createLoan(
    address _oracle,
    address _borrower,
    bytes32 _currency,
    uint256 _amount,
    uint256 _interestRate,
    uint256 _penaltyInterestRate,
    uint256 _duesIn,
    uint256 _firstPayment,
    uint256 _expiration,
    string _metadata
) public returns (uint256 id) {


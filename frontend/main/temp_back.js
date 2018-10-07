// Setup Stuff 
// const Web3 = require('web3');
// const Dharma = require('@dharmaprotocol/dharma.js');
// const ABIDecoder = require('abi-decoder');
// const promisify = require('tiny-promisify');
// const BigNumber = require('bignumber.js');
// const compact = require('lodash.compact');
// const request = require('request-json');
// const client = request.createClient('http://dharma-relayer-prod-993135204.us-east-1.elb.amazonaws.com/');

// const DebtRegistry = require('./build/contracts/DebtRegistry.json')
// const DebtKernel = require('./build/contracts/DebtKernel.json')
// const RepaymentRouter = require('./build/contracts/RepaymentRouter.json')
// const TokenTransferProxy = require('./build/contracts/TokenTransferProxy.json')
// const TokenRegistry = require('./build/contracts/TokenRegistry.json')
// const DebtToken = require('./build/contracts/DebtToken.json')
// const SimpleInterestTermsContract = require('./build/contracts/SimpleInterestTermsContract.json')

// ABIDecoder.addABI(DebtKernel.abi);
// ABIDecoder.addABI(RepaymentRouter.abi);
// mapping(address => uint256) public accountByAddress;


// const provider = window.web3.currentProvider;
// const dharma = new Dharma(provider);

// const dharma = new Dharma("http://localhost:8545"); // for local chain
// import { Dharma } from "@dharmaprotocol/dharma.js"; // for dhamra API
// import { Dharma, Web3 } from "@dharmaprotocol/dharma.js";
// const host = "http://localhost:8545";
// const provider = new Web3.providers.HttpProvider(host);

// const provider = window.web3.currentProvider; //WEB3 off window object
// const dharma = new Dharma(provider);

// Functions/API that we need. 

// Bloom API: Binary check if there is an associated address with account.  Web3
// https://bloom.co/docs/contracts/accounts#address-belongs-to-account
// testnet address: 0xfbc650e80d6796dff3101457eac4af994e4d2062
// Make sure to run apache php server: php -S 0.0.0.0:8008

function  bloomCheck(){

	var strWindowFeatures = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
	var URL = "https://bloom.co/app/signin";
	var win = window.open(URL, "_blank", strWindowFeatures);

	setTimeout(func, 15000);
		function func() {
		    $("#bloomid").attr("src","./images/bloomID.png"); //jquery call
		}

	accountRegistry = AccountRegistry.at("[0xfbc650e80d6796dff3101457eac4af994e4d2062]");
	hasBloomId = accountRegistry.addressBelongsToAccount.call(address);

	if(hasBloomId == 1){
		$("#bloomid").attr("src","./images/bloomID2.png"); //jquery call
	}
}

//Update Milestones

function milestones(transactions, users, revenue){
	var _transactions_num = revenue ;
	var _users_num = users;
	var _revenue_num = revenue ;
	var updateContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"revenue_set","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"new_users_num","type":"uint256"}],"name":"setUsers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getBlockNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"new_transactions_num","type":"uint256"}],"name":"setTransactions","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"users_set","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"transactions_set","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"new_revenue_num","type":"uint256"}],"name":"setRevenue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_transactions_num","type":"uint256"},{"name":"_users_num","type":"uint256"},{"name":"_revenue_num","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
	var update = updateContract.new(
	   _transactions_num,
	   _users_num,
	   _revenue_num,
	   {
	     from: web3.eth.accounts[0], 
	     data: '0x608060405234801561001057600080fd5b506040516060806102d9833981018060405281019080805190602001909291908051906020019092919080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600181905550816002819055508060038190555050505061022b806100ae6000396000f300608060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806302615c9c146100885780631a8acc8b146100b357806342cbb15c146100e05780634d0b2cc21461010b5780639a7e03b814610138578063bccc648d14610163578063d92a29091461018e575b600080fd5b34801561009457600080fd5b5061009d6101bb565b6040518082815260200191505060405180910390f35b3480156100bf57600080fd5b506100de600480360381019080803590602001909291905050506101c5565b005b3480156100ec57600080fd5b506100f56101cf565b6040518082815260200191505060405180910390f35b34801561011757600080fd5b50610136600480360381019080803590602001909291905050506101d7565b005b34801561014457600080fd5b5061014d6101e1565b6040518082815260200191505060405180910390f35b34801561016f57600080fd5b506101786101eb565b6040518082815260200191505060405180910390f35b34801561019a57600080fd5b506101b9600480360381019080803590602001909291905050506101f5565b005b6000600354905090565b8060028190555050565b600043905090565b8060018190555050565b6000600254905090565b6000600154905090565b80600381905550505600a165627a7a7230582060a31a567e04ad3b32d964e2f3629f2bb8e79362f4ef2e50f1db87d8a1c5a38f0029', 
	     gas: '4700000'
	   }, function (e, contract){
	    console.log(e, contract);
	    if (typeof contract.address !== 'undefined') {
	         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
	    }
	 })
}

// Bloqboard API 

// function loancreate(){

// 	const dharma = await instantiateDharma()
//     const tokenRegistry = await dharma.contracts.loadTokenRegistry()
//     const principalTokenSymbol = "ETH"
//     const principalToken = await tokenRegistry.getTokenAddressBySymbol.callAsync(principalTokenSymbol)
//     const debtor = web3.eth.accounts[0]
//     const creditor = debtor
//     const simpleInterestLoan = {
//         principalToken,
//         principalTokenSymbol,
//         principalAmount: 100000,
//         interestRate: 8,
//         amortizationUnit: "hours",
//         termLength: 35000,

//         debtor: debtor,
//         debtorFee: 0,
//         creditorFee: 0
//         // hardcoded
//         relayer: defaultAccount,
//         relayerFee: 0,

//         underwriter: '0x0000000000000000000000000000000000000000', //to be added
//         underwriterRiskRating: new BigNumber(0),
//         underwriterFee: new BigNumber(0),
//         underwriterSignature: {
//             "r": "",
//             "s": "",
//             "v": 0
//         },

//         relayer: '0x0000000000000000000000000000000000000000',
//         relayerFee: 0,

//         salt: new BigNumber(Math.floor(Math.random() * 100000))
//     };
// 	var dharmaDebtOrder = await dharma.adapters.simpleInterestLoan.toDebtOrder(simpleInterestLoan);
// 	    console.log('Debt order created: ' + JSON.stringify(dharmaDebtOrder, null, 2) + '\n')

// 	    const balance = await dharma.token.getBalanceAsync(principalToken, defaultAccount)
// 	    const allowance = await dharma.token.getProxyAllowanceAsync(principalToken, defaultAccount)
// 	    console.log("Balance: " + balance.toNumber())
// 	    console.log("Allowance: " + allowance.toNumber() + '\n')

// 	    // Sign as debtor
// 	    dharmaDebtOrder.debtorSignature = await dharma.sign.asDebtor(dharmaDebtOrder)
// 	    console.log('Debt order signed by debtor: ' + JSON.stringify(dharmaDebtOrder, null, 2) + '\n')

// 	    // Post order to the Relayer
// 	    var data = {
// 	        kernelAddress: dharmaDebtOrder.kernelVersion,
// 	        repaymentRouterAddress: dharmaDebtOrder.issuanceVersion,
// 	        principalAmount: dharmaDebtOrder.principalAmount,
// 	        principalTokenAddress: dharmaDebtOrder.principalToken,
// 	        debtorAddress: dharmaDebtOrder.debtor,
// 	        debtorFee: dharmaDebtOrder.debtorFee,
// 	        termsContractAddress: dharmaDebtOrder.termsContract,
// 	        termsContractParameters: dharmaDebtOrder.termsContractParameters,
// 	        expirationTime: new Date(dharmaDebtOrder.expirationTimestampInSec.mul(1000).toNumber()).toISOString(),
// 	        salt: dharmaDebtOrder.salt,
// 	        debtorSignature: JSON.stringify(dharmaDebtOrder.debtorSignature),
// 	        underwriterAddress: dharmaDebtOrder.underwriter,
// 	        underwriterRiskRating: dharmaDebtOrder.underwriterRiskRating,
// 	        underwriterFee: dharmaDebtOrder.underwriterFee,
// 	        underwriterSignature: JSON.stringify(dharmaDebtOrder.underwriterSignature),
// 	        relayerAddress: dharmaDebtOrder.relayer,
// 	        relayerFee: dharmaDebtOrder.relayerFee
// 	    }

// 	    var response = await client.post('/api/v0/debts', data)
// }

// // import { Dharma } from "@dharmaprotocol/dharma.js";
// // const host = "http://localhost:8545";

// function loanaccept(){
// 	var relayerOrder = (await client.get('/api/v0/debts/' + response.body.id)).body

// 	    dharmaDebtOrder = {
// 	        kernelVersion: relayerOrder.kernelAddress,
// 	        issuanceVersion: relayerOrder.repaymentRouterAddress,
// 	        principalAmount: new BigNumber(relayerOrder.principalAmount),
// 	        principalToken: relayerOrder.principalTokenAddress,
// 	        debtor: relayerOrder.debtorAddress,
// 	        debtorFee: new BigNumber(relayerOrder.debtorFee),
// 	        termsContract: relayerOrder.termsContractAddress,
// 	        termsContractParameters: relayerOrder.termsContractParameters,
// 	        expirationTimestampInSec: new BigNumber(new Date(relayerOrder.expirationTime).getTime() / 1000),
// 	        salt: new BigNumber(relayerOrder.salt),
// 	        debtorSignature: JSON.parse(relayerOrder.debtorSignature),
// 	        relayer: relayerOrder.relayerAddress,
// 	        relayerFee: new BigNumber(relayerOrder.relayerFee),
// 	        underwriter: relayerOrder.underwriterAddress,
// 	        underwriterRiskRating: new BigNumber(relayerOrder.underwriterRiskRating),
// 	        underwriterFee: new BigNumber(relayerOrder.underwriterFee),
// 	        underwriterSignature: JSON.parse(relayerOrder.underwriterSignature),
// 	        relayer: relayerOrder.relayerAddress,
// 	        relayerFee: new BigNumber(relayerOrder.relayerFee)
// 	    }

// 	    console.log("SIGN: " + JSON.stringify(dharmaDebtOrder.debtorSignature, null, 2) + '\n')

// 	    // Parse debt order
// 	    const parsedOrder = await dharma.adapters.simpleInterestLoan.fromDebtOrder(dharmaDebtOrder)

// 	    // Set creditor allowance for principal
// 	    let allowanceTx = await dharma.token.setUnlimitedProxyAllowanceAsync(principalToken, { from: creditor })
// 	    await dharma.blockchain.awaitTransactionMinedAsync(allowanceTx, 1000, 60000)

// 	    // Fill debt order
// 	    dharmaDebtOrder.creditor = creditor;

// 	    console.log('Relayer order: ' + JSON.stringify(dharmaDebtOrder, null, 2) + '\n')

// 	    const fillTx = await dharma.order.fillAsync(dharmaDebtOrder, { from: creditor });
// 	    const receipt = await dharma.blockchain.awaitTransactionMinedAsync(fillTx, 1000, 60000)

// 	    const [debtOrderFilledLog] = compact(ABIDecoder.decodeLogs(receipt.logs));

// 	    console.log('fillAsync txHash: ' + fillTx)
// 	    console.log('Debt order filled by creditor: ' + JSON.stringify(debtOrderFilledLog, null, 2) + '\n')

// 	    await client.put('/api/v0/debts/' + response.body.id, { status: 'Filled'} )
// }

// function instantiateDharma() {
//     const networkId = await promisify(web3.version.getNetwork)();
//     const accounts = await promisify(web3.eth.getAccounts)();
//     if (!accounts.length) {
//         throw new Error('ETH account not available');
//     }
//     defaultAccount = accounts[0];

//     if (!(networkId in DebtKernel.networks &&
//         networkId in RepaymentRouter.networks &&
//         networkId in TokenTransferProxy.networks &&
//         networkId in TokenRegistry.networks &&
//         networkId in DebtToken.networks &&
//         networkId in SimpleInterestTermsContract.networks &&
//         networkId in DebtRegistry.networks)) {
//         throw new Error('Unable to connect to the blockchain');
//     }

//     const dharmaConfig = {
//         kernelAddress: DebtKernel.networks[networkId].address,
//         repaymentRouterAddress: RepaymentRouter.networks[networkId].address,
//         tokenTransferProxyAddress: TokenTransferProxy.networks[networkId].address,
//         tokenRegistryAddress: TokenRegistry.networks[networkId].address,
//         debtTokenAddress: DebtToken.networks[networkId].address,
//         simpleInterestTermsContractAddress: SimpleInterestTermsContract.networks[networkId].address,
//         debtRegistryAddress: DebtRegistry.networks[networkId].address
//     };

//     return new Dharma.default(web3.currentProvider, dharmaConfig);
// }

// function dharmaloancreate(){
// 	const loanRequest = await LoanRequest.create(dharma, {
//     principalAmount: 100,
//     principalToken: "ETH",
//     collateralAmount: 1,
//     collateralToken: "ETH",
//     interestRate: 8,
//     termDuration: 48,
//     termUnit: "months",
//     debtorAddress: "0xd2f45e02ab7b190ac9a87b743eab4c8f2ed0e491",
//     expiresInDuration: 5,
//     expiresInUnit: "days",
// });
// }


// RCN API
// https://github.com/ripio/rcn-network

// function createLoan(
//     address _oracle,
//     address _borrower,
//     bytes32 _currency,
//     uint256 _amount,
//     uint256 _interestRate,
//     uint256 _penaltyInterestRate,
//     uint256 _duesIn,
//     uint256 _firstPayment,
//     uint256 _expiration,
//     string _metadata
// ) public returns (uint256 id) {


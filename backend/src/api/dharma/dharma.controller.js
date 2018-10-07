'use strict'; 

import { Dharma } from "@dharmaprotocol/dharma.js";
const { LoanRequest } = Dharma.Types;
const dharma = new Dharma("http://localhost:8545");

console.log('LoanRequest:',LoanRequest);


export async function createLoanRequest(req, res, next) {
  const terms = getTerms()
  // const loanRequest = await LoanRequest.create(dharma, terms);



  res.json(terms);
}


function getTerms() {
  return {
    principalAmount: 1,
    principalToken: "WETH",
    collateralAmount: 20,
    collateralToken: "REP",
    interestRate: 3.5,
    termDuration: 3,
    termUnit: "months",
    expiresInDuration: 1,
    expiresInUnit: "weeks",
  }
}



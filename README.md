# ethsf-iCash

iCash ETH SF Project

## Startup investment platform for convertible notes/SAFT's

The CNote platform where investors safely invest in startups through convertible notes/SAFTs. To get listed on CNote, startups use Bloom to get a KYC for all founders, proving the legitimacy of the company. After approval, they can list proposals for investors. Investors can view a list of verified companies, view details, and set the appropiate terms for convertible note/SAFTs.

The unique part of CNote outside of the KYC, is the convertible note feature and startup FICO score. Using blockchain to record the milestones of the invested company (transactions #, active user #, revenue), a smart contract will notify the investor when an appropriate milestone is reached, allowing equity to be converted or another loan to be issued. 

The startup FICO score is an innovative metric to track the credit worthiness of a startup. Based on transactions and information reported from the loaned value, companies gain a score which can be viewed by new potential investors. This score is also tied to the founders, creating a new type of credit history tied to the startup world. 

## Technologies Used  
  
- Bloom 
- Dharma
- Bloqboard  

# frontend
  
`todo: add api`  

# backend

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [GulpJS](https://gulpjs.com/) (`yarn global add gulp-cli`)
- [PostgreSQL](https://www.postgresql.org/) (`brew install postgresql`) (see db config for role)
- [Redis](https://redis.io/) Running on default port locally

### Developing

1. Run `yarn install` to install server dependencies.

2. Run `gulp db:create` to create database. Run `gulp db:drop` to drop database.

3. Run `node_modules/.bin/babel-node node_modules/.bin/sequelize db:migrate` to run migrations.

4. Run `gulp db:seed` to seed database.  (Not Implemented)

5. Run `yarn start` to start backend development.

6. Run `php -S 0.0.0.0:8008` to run.  

## Testing

Running `npm test` will run the unit tests with karma. (not implemented)  
  
================



>>>>>>> master

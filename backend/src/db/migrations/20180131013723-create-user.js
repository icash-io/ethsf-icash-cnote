'use strict';
require('dotenv').config();
import { User } from '../../db/models';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ethAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      contributionAmount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      kycVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      kycPending: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      kycAttempts: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      accessToken: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: Sequelize.ENUM(['admin', 'user']),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
    // TO-DO: ASK CLIENT RE ADMIN ACCESS
    let adminObj = {
      email: 'admin@ds.com',
      firstName: 'admin',
      lastName: 'admin',
      ethAddress: '',
      contributionAmount: 0,
      accessToken: process.env.ADMIN_PASSWORD,
    };
    return User.createRecord(adminObj, 'admin');
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
'use strict';
const {Sequelize, Op} = require('sequelize')
const sequelize = require('../db/sequelize')

module.exports = sequelize.define('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      field: 'firstName',
      type: Sequelize.STRING
    },
    lastName: {
      field: 'lastName',
      type: Sequelize.STRING
    },
    email: {
      field: 'email',
      type: Sequelize.STRING
    },
    settings: {
      field: 'settings',
      type: Sequelize.STRING
    },
    birthday: {
      field: 'birthday',
      type: Sequelize.DATE
    },
    createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    },

}, {
  timestamps: true
});

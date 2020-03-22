const {Sequelize, Op} = require('sequelize')
const sequelize = require('../db/sequelize')

module.exports = sequelize.define('weather_alerts', {
    id: {
        field: 'weatherId',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    geometry: {
        field: 'geometry',
        type: Sequelize.STRING,
        allowNull: true
    },
    properties: {
        field: 'properties',
        type: Sequelize.STRING
    },
    propertiesId: {
        field: 'propertiesId',
        type: Sequelize.STRING
    },
    valid: {
        field: 'valid',
        type: Sequelize.INTEGER
    },
    expires: {
        field: 'expires',
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
})
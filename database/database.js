const Sequelize = require('sequelize');

const connection = new Sequelize('eco_agendamento','eco_agendamento','mana2005',{
	host: '45.34.12.245',
	dialect: 'mysql'
});

module.exports = connection;
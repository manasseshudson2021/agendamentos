const Sequelize = require('sequelize');
const db = require('./database');


const Usuarios = db.define('usuarios',{
	id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
	Nome:{
		type: Sequelize.STRING
	},
	Cnpj:{
		type: Sequelize.STRING
	},
	Senha: {
		type: Sequelize.STRING
	}
})

Usuarios.sync({force:false});

module.exports = Usuarios;
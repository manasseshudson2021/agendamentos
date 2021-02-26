const Sequelize = require('sequelize');
const db = require('./database');


const Clientes = db.define('clientes',{
    Codigo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
	Nome:{
		type: Sequelize.STRING
	},
	Responsavel:{
		type: Sequelize.STRING
	},
	Email:{
		type: Sequelize.STRING
	},
	Cnpj:{
		type: Sequelize.STRING
	},
	Cep:{
		type: Sequelize.STRING
	},
	Endereco:{
		type: Sequelize.STRING
	},
	Bairro:{
		type: Sequelize.STRING
	},
	Cidade:{
		type: Sequelize.STRING
	},
	Uf:{
		type: Sequelize.STRING
	},
	Numero:{
		type: Sequelize.STRING
	},
	Complemento:{
		type: Sequelize.STRING
	},
	Telefone:{
		type: Sequelize.STRING
	},
	Celular:{
		type: Sequelize.STRING
	}
})


Clientes.sync({force:false})

module.exports = Clientes;
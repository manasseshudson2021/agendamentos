const Sequelize = require('sequelize');
const db = require('./database');


const Funcionarios = db.define('funcionarios',{
    Codigo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
	Nome:{
		type: Sequelize.STRING
	},
	Email:{
		type: Sequelize.STRING
	},
	Cpf:{
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


Funcionarios.sync({force:false})

module.exports = Funcionarios;
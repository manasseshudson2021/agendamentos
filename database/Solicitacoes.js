const Sequelize = require('sequelize');
const db = require('./database');


const Solicitacoes = db.define('solicitacoes',{
	id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
	Codigo: {
		type: Sequelize.STRING
	},
	Descricao:{
		type: Sequelize.STRING
	},
	Cliente:{
		type: Sequelize.STRING
	},
    Funcionario:{
        type: Sequelize.STRING
    },
    Abertura:{
        type: Sequelize.STRING
    },
	Status: {
		type: Sequelize.STRING
	},
	Observacao: {
		type: Sequelize.STRING
	}
})

Solicitacoes.sync({force:false});

module.exports = Solicitacoes;
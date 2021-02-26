'use strict'

exports.get = (req, res) => {
	var _id = req.params.id;
	Solicitacoes.findAll({ where: {'id': _id}}).then(solicitacoes => {
		Funcionarios.findAll({ raw: true}).then(funcionarios=>{	
			console.log(solicitacoes);	
			res.render('solicitacoes', {
				title: 'Sistema de Agendamentos',
				name : 'Agendamentos',
				solicitacoes: solicitacoes,
				funcionarios: funcionarios
			})					
		})
	})
}

exports.post = (req, res) => {
	var _id = req.body.id;
	var _funcionario = req.body.funcionario;

	//console.log("funcionario" +_funcionario);
	Solicitacoes.update(
	{
		Funcionario: _funcionario
	}, 
	{
		where: { id: _id },
	}).then(()=>{
		console.log('registro atualzado com sucesso')
		res.redirect('/index')
	})
}
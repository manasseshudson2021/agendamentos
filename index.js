const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session')
const app = express();

app.use(session({secret:'MTIzNDU2'}));

const db = require('./database/database');
const Usuarios = require('./database/Usuario');
const Solicitacoes = require('./database/Solicitacoes');
const Clientes = require('./database/Clientes');
const Funcionarios = require('./database/Funcionarios');


db.authenticate().then(() => {
	console.log('conexao com banco efetuada com sucesso');
}).catch((err) => {
	console.log(err);
})

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static('public'))

app.locals.CnpjLogin = "";
/*---------------------------------------------------*/
app.get('/', (req, res) => {
	//pushClientes();
	res.render('login', {
		title: 'Sistema de Agendamentos',
		name : 'Agendamentos'
	})
	
})
app.post('/', (req, res) => {
	var _cnpj = req.body.cnpj;
	var _senha = req.body.senha;
	
	req.session.login = _cnpj;
	
	
	console.log(req.session.login);
	//CnpjLogin= _cnpj;
	
	Usuarios.findAll({where: {'Cnpj': _cnpj}}).then(()=>{
		res.redirect('index')
	})
	
	//console.log(CnpjLogin);
		
	
})

app.get('/index', (req, res) => {
	console.log(codigoSolcitacao());
	Solicitacoes.count().then(totalSolicitacoes => {
		Solicitacoes.count({ where: {'Status': 'Pendente'}}).then(cPendente => { 
			Solicitacoes.count({ where: {'Status': 'Finalizado'}}).then(cFinalizado => { 
			
				
				Solicitacoes.findAll({ raw: true, order: [['id', 'DESC']] }).then(registros => { 
					Clientes.findAll({ raw: true }).then(clientes=>{
						Funcionarios.findAll({ raw: true}).then(funcionarios=>{				
							res.render('index', {
								title: 'Sistema de Agendamentos',
								solicitacoes: registros,
								clientes: clientes,
								funcionarios: funcionarios,
								totalSolicitacoes : totalSolicitacoes,
								totalSolicitacoesPendentes: cPendente,
								totalSolicitacoesFinalizado: cFinalizado,
								name : 'Agendamentos',
								Cnpj : req.session.login
							})			
						
						})
					})
				})
			
			})
			
		})		
	})
	
})


/*FUNCIONARIOS ---------------------------------------------------*/
app.get('/funcionarios', (req, res) => {
	Funcionarios.findAll({ raw: true }).then(funcionarios => {
		res.render('funcionarios', {
			title: 'Sistema de Agendamentos',
			name : 'Agendamentos',
			funcionarios: funcionarios,
			Cnpj : req.session.login
		})	
	})	
})
app.get('/addFuncionarios', (req, res) => {
	res.render('addFuncionarios', {
			title: 'Sistema de Agendamentos',
			name : 'Agendamentos',
			Cnpj : req.session.login
	})
})
app.post ('/funcionarios/adicionar',(req,res)=>{
	var _nome = req.body.nome;
	var _email = req.body.email;
	var _cpf = req.body.cpf;
	var _cep = req.body.cep;
	var _endereco = req.body.rua;
	var _bairro = req.body.bairro;
	var _cidade = req.body.cidade;
	var _uf = req.body.uf;
	var _numero = req.body.numero;
	var _complemento = req.body.complemento;
	var _telefone = req.body.telefone;
	var _celular = req.body.celular;

	Funcionarios.create({ 
		Nome: _nome,
		Email: _email,
		Cpf: _cpf,
		Cep: _cep,
		Endereco: _endereco,
		Bairro: _bairro,
		Cidade: _cidade,
		Uf: _uf,
		Numero: _numero,
		Complemento: _complemento,
		Telefone:_telefone,
		Celular: _celular
	}).then(()=>{
		console.log('registro inserido com sucesso');
		res.redirect('/funcionarios')
	}).catch((err)=>{
		console.log(err)
	});
	
})
app.get('/funcionarios/alterar/:codigo', (req, res) => {
	console.log(req.params.codigo);
	Funcionarios.findAll({ where: {'codigo': req.params.codigo}}).then(funcionarios => {
		res.render('altFuncionarios', {
				title: 'Sistema de Agendamentos',
				name : 'Agendamentos',
				Cnpj : req.session.login,
				Funcionario: funcionarios
		})
		
	})
})
app.post ('/funcionarios/alterar',(req,res)=>{
	var _codigo =req.body.codigo;
	var _nome = req.body.nome;
	var _email = req.body.email;
	var _cpf = req.body.cpf;
	var _cep = req.body.cep;
	var _endereco = req.body.rua;
	var _bairro = req.body.bairro;
	var _cidade = req.body.cidade;
	var _uf = req.body.uf;
	var _numero = req.body.numero;
	var _complemento = req.body.complemento;
	var _telefone = req.body.telefone;
	var _celular = req.body.celular;
	
	
	Funcionarios.update(
	{
		Nome: _nome,
		Email: _email,
		Cpf: _cpf,
		Cep: _cep,
		Endereco: _endereco,
		Bairro: _bairro,
		Cidade: _cidade,
		Uf: _uf,
		Numero: _numero,
		Complemento: _complemento,
		Telefone:_telefone,
		Celular: _celular
	}, 
	{
		where: { codigo: _codigo },
	}).then(()=>{
		console.log('registro atualzado com sucesso')
		res.redirect('/Funcionarios')
	})
	
})

app.post('/funcionarios/remove', (req, res) => {
	var _codigo = req.body.codigo;

	Funcionarios.destroy({
		where: { codigo: _codigo },
	}).then(()=>{
		console.log('registro excluido com sucesso');
		res.redirect('/funcionarios');
	}).catch((err)=>{
		console.log(err)		
	})


})

/*CLIENTES ---------------------------------------------------*/
app.get('/clientes', (req, res) => {
	Clientes.findAll({ raw: true }).then(clientes => {
		res.render('clientes', {
			title: 'Sistema de Agendamentos',
			clientes: clientes,
			name : 'Agendamentos',
			Cnpj : req.session.login
		})	
	})	
})

app.get('/addClientes', (req, res) => {
	res.render('addClientes', {
			title: 'Sistema de Agendamentos',
			name : 'Agendamentos',
			Cnpj : req.session.login
	})
})


app.post('/clientes/remove', (req, res) => {
	var _codigo = req.body.codigo;

	Clientes.destroy({
		where: { codigo: _codigo },
	}).then(()=>{
		console.log('registro excluido com sucesso');
		res.redirect('/clientes');
	}).catch((err)=>{
		console.log(err)		
	})


})
app.post ('/clientes/adicionar',(req,res)=>{
	var _nome = req.body.nome;
	var _responsavel = req.body.responsavel;
	var _email = req.body.email;
	var _cnpj = req.body.cnpj;
	var _cep = req.body.cep;
	var _endereco = req.body.rua;
	var _bairro = req.body.bairro;
	var _cidade = req.body.cidade;
	var _uf = req.body.uf;
	var _numero = req.body.numero;
	var _complemento = req.body.complemento;
	var _telefone = req.body.telefone;
	var _celular = req.body.celular;

	Clientes.create({ 
		Nome: _nome,
		Responsavel: _responsavel,
		Email: _email,
		Cnpj: _cnpj,
		Cep: _cep,
		Endereco: _endereco,
		Bairro: _bairro,
		Cidade: _cidade,
		Uf: _uf,
		Numero: _numero,
		Complemento: _complemento,
		Telefone:_telefone,
		Celular: _celular
	}).then(()=>{
		console.log('registro inserido com sucesso');
		res.redirect('/Clientes')
	}).catch((err)=>{
		console.log(err)
	});
	
})

/*--------------------------------------------------------*/

/*---------------------------------------------------*/

/**/

app.get('/solicitacoes/:id', (req, res) => {
	var _id = req.params.id;
	Solicitacoes.findAll({ where: {'id': _id}}).then(solicitacoes => {
		Funcionarios.findAll({ raw: true}).then(funcionarios=>{	
			console.log(solicitacoes);	
			res.render('solicitacoes', {
				title: 'Sistema de Agendamentos',
				name : 'Agendamentos',
				solicitacoes: solicitacoes,
				funcionarios: funcionarios,
				Cnpj : req.session.login
			})					
		})
	})
})

app.post('/solicitacoes', (req, res) => {
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
})

/*---------------------------------------------------*/


app.post('/addSolicitacao', (req,res)=>{
	var _descricao = req.body.descricao;
	var _cliente = req.body.cliente;
	var _funcionario = req.body.funcionario;
	var _status = req.body.status;
	var _observacao = req.body.observacao;
	var _codigo = codigoSolcitacao();
	
	Solicitacoes.create({
		Codigo: _codigo,
		Descricao:_descricao,
		Cliente: _cliente,
		Funcionario:_funcionario,
		Abertura:'10/02/2021',
		Status: _status,
		Observacao: _observacao
	}).then(()=>{
		console.log('registro inserido com sucesso');
		res.redirect('/index')
	}).catch((err)=>{
		console.log(err);		
	})
	
})


function hora () {
	
	let data1 = new Date();

	var data = new Date(data1.valueOf() - data1.getTimezoneOffset() * 60000);

	// Guarda cada pedaço em uma variável
	var dia     = data.getDate();           // 1-31
	var dia_sem = data.getDay();            // 0-6 (zero=domingo)
	var mes     = data.getMonth();          // 0-11 (zero=janeiro)
	var ano2    = data.getYear();           // 2 dígitos
	var ano4    = data.getFullYear();       // 4 dígitos
	var hora    = data.getHours();          // 0-23
	var min     = data.getMinutes();        // 0-59
	var seg     = data.getSeconds();        // 0-59
	var mseg    = data.getMilliseconds();   // 0-999
	var tz      = data.getTimezoneOffset(); // em minutos

	// Formata a data e a hora (note o mês + 1)
	var str_data = dia + '/' + (mes+1) + '/' + ano4;
	var str_hora = hora + ':' + min + ':' + seg;


	return str_hora;
	
	
}

function codigoSolcitacao () {
	
	let data1 = new Date();

	var data = new Date(data1.valueOf() - data1.getTimezoneOffset() * 60000);

	// Guarda cada pedaço em uma variável
	var dia     = data.getDate();           // 1-31
	var dia_sem = data.getDay();            // 0-6 (zero=domingo)
	var mes     = data.getMonth();          // 0-11 (zero=janeiro)
	var ano2    = data.getYear();           // 2 dígitos
	var ano4    = data.getFullYear();       // 4 dígitos
	var hora    = data.getHours();          // 0-23
	var min     = data.getMinutes();        // 0-59
	var seg     = data.getSeconds();        // 0-59
	var mseg    = data.getMilliseconds();   // 0-999
	var tz      = data.getTimezoneOffset(); // em minutos

	// Formata a data e a hora (note o mês + 1)
	var str_data = ano4 + ''+(mes+1) + ''+ dia + ''+hora + ''+min;
	//var str_hora = hora + ':' + min + ':' + seg;


	return str_data;
	
	
}

app.listen(3000, () => {
	console.log('api rodandndo')
})
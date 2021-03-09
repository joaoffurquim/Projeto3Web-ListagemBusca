let http = require('http'),
	fs = require('fs'),
    Postagem = require('./model/postagem'),
	express = require('express'),
	path = require('path'),
	app = express(),
    multer = require('multer');
    session = require('express-session'),
    logger = require('morgan');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    Postagem.get('').then(
    (postagens) => {
        res.render('home', {postagens: postagens});
    });
});


// PROJETO 03

app.post('/pesquisa', (req, res) => {
    Postagem.get(req.body.busca).then(
    (postagens) => {
        res.end(postagens.map((postagem) =>{
            return 	 '<div>' + postagem.titulo + '</div>\
						 	<div>' + postagem.descricao + '</div>'
        }).join(""));
    });
});

app.post('/publica', (req, res) => {
   var titulo = req.body.caixaPost;
   //console.log("titulo: " + titulo);
   Postagem.insert(titulo, "", 'vitor').then(
    (conn) => {
        Postagem.get("").then(
        (postagens) => {
            res.end(postagens.map((postagem) =>{
							return 	 '<div>' + postagem.titulo + '</div>\
								<div>' + postagem.descricao + '</div>'
						}).join(""));
        });
    });
});

app.get('/postagens', (req, res) => {
    Postagem.get("").then(
    (postagens) => {
        res.end(postagens.map((postagem) =>{
					return 	 '<div>' + postagem.titulo + '</div>\
						<div>' + postagem.descricao + '</div>'
				}).join(""));
    });
});

http.createServer(app).listen(2525);

const express = require ('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
   // res.send('<h1>Hello Express!<h1>');
    res.render('home', {
        aba: 'Express!',
        pageTitle: 'Home Page!',
        welcomeMsg: 'Seja Bem Vindo!'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', {pageTitle: 'Projects Page'});
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to connect to the page'
    });
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});

//add new projects page to the website
//lugar onde vc poderá linkar com seus githubs projects
//registrar no url getter /projects e render a handler bar template
//em views criar projects como home e setar msg 'portfolio page here'
//em partials/header add link para projects page
//teste localmente e depois commit it
//push it up github
//push it up heroku remote: git push heroku

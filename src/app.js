const express = require('express');
const path = require('path');
const morgan= require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();
//import rutes
const customerRoutes = require('./routes/customer');
//settings
app.set('port',process.env.PORT||3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//midlewares
app.use(morgan('dev'));
app.use(myConnection(mysql,{
    host: 'localhost',
    user:'root',
    password: 'shelvykr',
    port:'3306',
    database:'practica'
}, 'single'))
app.use(express.urlencoded({extended:false}));
//rutes
app.use('/', customerRoutes);
// static files
app.use(express.static(path.join(__dirname, 'public')));
//starting serve
app.listen(app.get('port'), ()=>{
console.log('server on port 3000');
});
require('dotenv').config();
const express = require('express');         
const expressLayout = require('express-ejs-layouts');
const methodOverride = require("method-override");
const connectDB = require('./server/config/db');
const app = express();
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const port = 5000 || process.env.PORT;

app.use(session({
  secret: 'Run Run Run',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
   mongoUrl: process.env.MONGODB_URI
  }),
  //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
  // Date.now() - 30 * 24 * 60 * 60 * 1000
  })
);


app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));
connectDB();  
app.use(express.static('public'));
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
// app.get('/', function(req, res) {
//     const locals = {
//         title: 'OnlyNote',
//         description: 'Free Notes Application'
//     }
//     res.render('index', locals);
// });
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));

connectDB();

app.get('*', function(req, res) {
    //res.status(404).send('404 Page Not Found.')
    res.status(404).render('404');
  })

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
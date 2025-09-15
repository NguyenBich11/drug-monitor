const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const connectMongo = require('./server/database/connect');
const PORT = process.env.PORT || 3100;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('assets'));
app.use(morgan('tiny'));

connectMongo(); 

app.use('/',require('./server/routes/routes'));

app.use((req, res, next) => {
    res.status(404).render("error", { 
        message: "Page not found", 
        error: {} 
    });
});

app.listen(PORT, function() {
	console.log('listening on '+ PORT);
	console.log(`Welcome to the Drug Monitor App at http://localhost:${PORT}`);
})
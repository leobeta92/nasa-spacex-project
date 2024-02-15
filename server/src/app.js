// Moved all middleware express code here.
const path = require('path');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const api = require('./routes/api');

// takes incoming json data from request.
const app = express(); 

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')));

// all routes will now be under v1 in this file. When there is a v2, then we can create another router and just pass along the version. Allows us to support multiple versions at the same time.
app.use('/v1',api);

// Common with single page apps - serves static file and client handles all other interactions.
app.get('/*',(req,res) => {
    res.sendFile(path.join(__dirname,'..','public','index.html'))
})

module.exports = app;
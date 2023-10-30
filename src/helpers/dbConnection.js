const pgp = require('pg-promise')()
const connectionURL = 'postgres://postgres:admin@localhost:5432/ITSM';
const db = pgp(connectionURL);
module.exports ={pgp,db}
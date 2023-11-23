
// // const connectionURL = 'postgres://postgres:admin@localhost:5432/ITSM';
// // const pgp = require('pg-promise')()
// // const db = pgp(connectionURL);

// // Assuming you have a database connection named 'db'

var pg = require('pg');
// const pgp = require('pg-promise')()
// const connectionURL = 'postgres://postgres:admin@localhost:5432/ITSM';
// const db = pgp(connectionURL);
var conString = "postgres://bbufkjqf:11Cu2oK2aX7PthzXHBWPlf_BIlZX-ZZr@berry.db.elephantsql.com/bbufkjqf" //Can be found in the Details page
var client = new pg.Client(conString);
flag= false
if(!flag)
{
client.connect()
falg = true
}



const insertTicket = async (user_id,subject, description,  priority=3) => {
    try {
        const query = `
            INSERT INTO tickets (ticket_sub, ticket_desc, created_by, priority)
            VALUES ($1, $2, $3, $4)
            RETURNING *`;
        
        const values = [subject, description, user_id, priority];

        const result = await client.query(query, values);
        console.log('The inserted rows',result.rows)
        return result;
    } catch (error) {
        throw new Error(`Error inserting ticket: ${error.message}`);
    }
};

module.exports ={insertTicket}
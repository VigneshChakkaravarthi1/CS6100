
const connectionURL = 'postgres://postgres:admin@localhost:5432/ITSM';
const pgp = require('pg-promise')()
const db = pgp(connectionURL);

// Assuming you have a database connection named 'db'

const insertTicket = async (user_id,subject, description,  priority=3) => {
    try {
        const query = `
            INSERT INTO tickets (ticket_sub, ticket_desc, created_by, priority)
            VALUES ($1, $2, $3, $4)
            RETURNING ticket_id`;
        
        const values = [subject, description, user_id, priority];

        const result = await db.one(query, values);
        console.log('Ticket inserted successfuly',result)
        return result.ticket_id;
    } catch (error) {
        throw new Error(`Error inserting ticket: ${error.message}`);
    }
};

module.exports ={insertTicket}
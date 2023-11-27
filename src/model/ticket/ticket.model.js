var pg = require('pg');
const {Ticket,ticketSchema} = require("./../../schemas/attachment.schema")
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
const insertTicket=async(subject,description,user_id)=>{
    try {
      const query = `
          INSERT INTO tickets(ticket_sub,ticket_desc,created_by) values($1,$2,$3) RETURNING *;
      `;
      const result = await client.query(query, [subject,description,user_id]);
     
      
      return result ? result.rows[0] : null; // Returning password if found, otherwise null
  } catch (error) {
      throw new Error(`Error retrieving password: ${error.message}`);
  }
  
  }

  const getTickets= async()=>{
    try{
        const query = `
          select * from tickets tickets order by created_at desc;
      `;

      return  await client.query(query);

    }
    catch(error)
    {
        throw new Error("Error retreiving tickets",error.message)
    }
  }

  const insertFileNameMongo=async(file_name,ticket_id)=>{


    const existingTicket = await Ticket.findOne({ ticket_id });
    console.log(existingTicket)
   
    if (existingTicket) {
        // If the ticket_id exists, update the file_paths array
        existingTicket.file_paths.push(file_name);
        existingTicket.conversation.push({ text: conversationText, created_at: new Date() });
        await existingTicket.save();
        console.log('File path and conversation added to existing ticket');
      }
      else {
        // If the ticket_id doesn't exist, create a new record
        const newTicket = new Ticket({
          ticket_id,
          file_paths: [file_name],
          conversation: [],
        });
        await newTicket.save();

    
  }
  }


  const insertComments =async(ticket_id,comment)=>{
    try {
      
      const foundTicket = await Ticket.findOne({ ticket_id });

      if (foundTicket) {
        foundTicket.comments.push({
          text: comment,
          created_at: new Date() // Set the 'created_at' field to the current date/time
        });
  
        const result = await foundTicket.save();
       return result


    }
    else {
      console.log('Ticket not found');
      return null
      // Handle the case where the ticket is not found
    }}
    catch(error)
    {
      console.log("Error has occure",error)
    }

  }

  const close_ticket =async(ticket_id)=>{
    
    try{
      const query1 = "UPDATE tickets SET ticket_status = 3 where ticket_id =$1"
   
    const result = await client.query(query1,[ticket_id])
    console.log('Rows affected:', result.rowCount);
    return true

    }
    catch(error)
    {
      throw new Error(error.message)
    }
    
    


  }
  const get_ticket_by_ticket_id =async(ticket_id)=>

  {
    const query = 'select * from tickets inner join teams on ticket_team = team_id where ticket_id=$1'
    const values = [ticket_id]
    const ticket =await client.query(query,values)
    const comments= await Ticket.findOne({ticket_id})
    
    return [ticket.rows,comments]


  }
  module.exports={get_ticket_by_ticket_id,insertTicket,getTickets,insertFileNameMongo,insertComments,close_ticket}
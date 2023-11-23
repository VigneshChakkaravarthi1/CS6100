const { hashPassword } = require("../../helpers/bcrypt.helper")
// const {pgp,db} =require("../../helpers/dbConnection")
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
const getPasswordFromDb=async(email)=>{
  try {
    const query = `
        SELECT user_password FROM user_credentials WHERE user_email = $1
    `;
    const result = await client.query(query, [email]);
   
    
    return result ? result.rows[0].user_password : null; // Returning password if found, otherwise null
} catch (error) {
    throw new Error(`Error retrieving password: ${error.message}`);
}

}
const getUserByEmail=async(email)=>{
    return new Promise(async(resolve,reject)=>{
    try{
        const result = await client.query('SELECT * FROM users where user_email = $1;',[email])
        
    if(result['rows'])
    {
      resolve(  result['rows'])
    }
    else
    {
      reject("No result found")
    }

    }

    catch(error){
        reject(error)
    }

    })
}

// Assuming you have a database connection named 'db'

const insertUserIntoDB = async (user_data) => {
    try {
      

      
        const { user_email, user_fname, user_lname, user_phone_no, user_status, user_isadmin } = user_data;
     
        const query =`insert into 
                      users(user_email,user_fname,user_lname,user_phone_no,user_status,user_isadmin) 
                      values($1,$2,$3,$4,$5,$6) RETURNING *;`
        
        const values = [user_email, user_fname, user_lname, user_phone_no, user_status, user_isadmin];
        
      result = await client.query(query,values)
      if(result.rows[0])
      {
        return result.rows[0]
      }
     
     
        
        
      //   return result.rows;
      // return 1
    } catch (error) {
        throw new Error(`Error inserting user: ${error.message}`);
    }
};


  
  const insertCredentials=async( email, password)=>
  {

    return new Promise(async(resolve,reject)=>{
      password = await hashPassword(password)
      const query = {
        text: 'INSERT INTO user_credentials (user_email,user_password ) VALUES ($1, $2)',
        values: [email,password]
        
      };
      try{
       await client.query(query.text,query.values)
      resolve(true)
      }
      catch(error)
      {
        reject(error)
      }
      

      
    








    })

    

  }
module.exports = {getUserByEmail,insertUserIntoDB,insertCredentials,getPasswordFromDb}
const { hashPassword } = require("../../helpers/bcrypt.helper")
// const {pgp,db} =require("../../helpers/dbConnection")

const pgp = require('pg-promise')()
const connectionURL = 'postgres://postgres:admin@localhost:5432/ITSM';
const db = pgp(connectionURL);


const getPasswordFromDb=async(email)=>{
  try {
    const query = `
        SELECT user_password FROM user_credentials WHERE user_email = $1
    `;
    const result = await db.oneOrNone(query, [email]);
    return result ? result.user_password : null; // Returning password if found, otherwise null
} catch (error) {
    throw new Error(`Error retrieving password: ${error.message}`);
}

}
const getUserByEmail=async(email)=>{
    return new Promise(async(resolve,reject)=>{
    try{



        const result = await db.any('SELECT * FROM users where user_email = $1',[email]).then(data=>resolve(data))
      resolve(result)

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
      
        const query = `
            INSERT INTO users (user_email, user_fname, user_lname, user_phone_no, user_status, user_isadmin)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING user_id`;
        
        const values = [user_email, user_fname, user_lname, user_phone_no, user_status, user_isadmin];

        const result = await db.one(query, values);
        
        return result.user_id;
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
       await db.oneOrNone(query.text,query.values)
      resolve(true)
      }
      catch(error)
      {
        reject(error)
      }
      

      
    








    })

    

  }
module.exports = {getUserByEmail,insertUserIntoDB,insertCredentials,getPasswordFromDb}
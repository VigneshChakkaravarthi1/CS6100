const { hashPassword } = require("../../helpers/bcrypt.helper")
// const {pgp,db} =require("../../helpers/dbConnection")

const pgp = require('pg-promise')()
const connectionURL = 'postgres://postgres:admin@localhost:5432/ITSM';
const db = pgp(connectionURL);
const getUserByEmail=async(email)=>{
    return new Promise(async(resolve,reject)=>{
    try{



        const result = await db.any('SELECT * FROM user_data where email = $1',[email]).then(data=>resolve(data))
      resolve(result)

    }

    catch(error){
        reject(error)
    }

    })
}

const insertUserintoDB = async (user_data) => {
    try {
//       // Extract values from the user_data JSON
      var { fname, lname,email, password,phone } = user_data;
    password =  await hashPassword(password)
    console.log("Insert statements")

 
      const query = {
        text: 'INSERT INTO user_data (first_name, last_name, phone, email,created_by,role_name) VALUES ($1, $2, $3, $4,$5,$6) RETURNING *',
        values: [fname, lname, phone, email,"Vignesh Chakkaravarthi","admin"],
      }
       
//       // Assuming "db" is your database connection object
     
await db.oneOrNone(query.text,query1.values).then(data=>console.log("The data inserted is ",data))
    }
    catch(error)
    {
        console.log("The error occured is",error)
    }
  };
  
  const insertCredentials=async(user_id, email, password)=>
  {

    return new Promise(async(resolve,reject)=>{
      password = await hashPassword(password)
      const query = {
        text: 'INSERT INTO user_credentials (user_id,user_email,password ) VALUES ($1, $2,$3)',
        values: [user_id,email,password]
        
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
module.exports = {getUserByEmail,insertUserintoDB,insertCredentials}
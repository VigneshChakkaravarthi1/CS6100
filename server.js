var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native
const express = require("express")
const app = express()

var conString = "postgres://bbufkjqf:11Cu2oK2aX7PthzXHBWPlf_BIlZX-ZZr@berry.db.elephantsql.com/bbufkjqf" //Can be found in the Details page
var client = new pg.Client(conString);
// client.connect(function(err) {
//   if(err) {
//     return console.error('could not connect to postgres', err);
//   }
//   client.query('SELECT NOW() AS "theTime"', function(err, result) {
//     if(err) {
//       return console.error('error running query', err);
//     }
//     console.log(result.rows[0].theTime);
//     // >> output: 2018-08-23T14:02:57.117Z
//     client.end();
//   });
// });
const print_count=async()=>{
    client.connect()
    const results = await client.query(`Insert into teams(team_name) values($1)`,['Security'])
    console.log('the result is ,',results )
}
print_count()
const port = process.env.PORT || 3001
app.listen(port,()=>{
    console.log("API is running on http://localhost:"+port)
})
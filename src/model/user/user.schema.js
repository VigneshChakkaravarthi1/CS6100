

const fetch_user_list = (n) => {
  return new Promise((resolve, reject) => {
    db.any('SELECT * FROM Customers where customer_id = $1',[n])
      .then(data => {
        resolve(data); // Resolve the Promise with the data
      })
      .catch(error => {
        reject(error); // Reject the Promise with the error
      })
      .finally(() => {
        pgp.end(); // Close the database connection
      });
  });
};

// To use the function, you can call it and handle the Promise.
fetch_user_list(3).then(data=>console.log(data)).catch(error=>console.log(error))




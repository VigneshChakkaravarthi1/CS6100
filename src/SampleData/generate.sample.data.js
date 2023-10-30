const faker = require('faker');
const { Pool } = require('pg');

// Replace with your database connection details
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ITSM',
  password: 'admin',
  port: 5432,
});

// Generate 1000 unique entries
async function generateUserEntries() {
  const client = await pool.connect();

  try {
    for (let i = 0; i < 1000; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email();
      const phone = faker.phone.phoneNumberFormat();
      const userCreatedAt = new Date();
      const createdBy = `API_User${i + 1}`;

      await client.query(
        'INSERT INTO user_data (first_name, last_name, email, phone, user_created_at, created_by) VALUES ($1, $2, $3, $4, $5, $6)',
        [firstName, lastName, email, phone, userCreatedAt, createdBy]
      );
    }
  } catch (error) {
    console.error('Error generating user entries:', error);
  } finally {
    client.release();
  }
}

generateUserEntries()
  .then(() => console.log('Generated 1000 unique user entries'))
  .catch((err) => console.error('Error:', err));

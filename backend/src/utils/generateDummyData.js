const { pool } = require('../config/database');
const faker = require('faker');

async function generateContacts(count) {
  const contacts = [];
  for (let i = 0; i < count; i++) {
    contacts.push([
      faker.name.findName(),
      faker.internet.email(),
      faker.phone.phoneNumber()
    ]);
  }
  
  const query = `
    INSERT INTO contacts (name, email, phone)
    VALUES ($1, $2, $3)
    RETURNING id
  `;
  
  const contactIds = [];
  for (const contact of contacts) {
    const result = await pool.query(query, contact);
    contactIds.push(result.rows[0].id);
  }
  
  return contactIds;
}

async function generateMessages(contactIds, count) {
  const messages = [];
  for (let i = 0; i < count; i++) {
    const contactId = contactIds[Math.floor(Math.random() * contactIds.length)];
    messages.push([
      contactId,
      faker.lorem.paragraph()
    ]);
  }
  
  const query = `
    INSERT INTO messages (contact_id, content)
    VALUES ($1, $2)
  `;
  
  for (const message of messages) {
    await pool.query(query, message);
  }
}

async function generateDummyData() {
  try {
    console.log('Generating 100,000 contacts...');
    const contactIds = await generateContacts(100000);
    
    console.log('Generating 5,000,000 messages...');
    await generateMessages(contactIds, 5000000);
    
    console.log('Dummy data generation completed successfully!');
  } catch (error) {
    console.error('Error generating dummy data:', error);
  } finally {
    pool.end();
  }
}

generateDummyData(); 
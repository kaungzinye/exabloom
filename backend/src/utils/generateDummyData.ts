import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { Contact } from '../models/contact.model';
import { Message } from '../models/message.model';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Function to read message content from CSV
async function readMessageContent(): Promise<string[]> {
  try {
    const csvPath = path.join(__dirname, '../../message_content.csv');
    console.log(`Reading CSV file from: ${csvPath}`);
    
    if (!fs.existsSync(csvPath)) {
      throw new Error(`CSV file not found at ${csvPath}`);
    }

    const content = fs.readFileSync(csvPath, 'utf-8');
    const messages = content.split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#')); // Skip empty lines and comments
    
    console.log(`Successfully read ${messages.length} messages from CSV`);
    return messages;
  } catch (error) {
    console.error('Error reading CSV file:', error);
    throw error;
  }
}

// Function to generate a random date within the last year
function getRandomDate(): Date {
  const now = new Date();
  const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
  return new Date(oneYearAgo.getTime() + Math.random() * (now.getTime() - oneYearAgo.getTime()));
}

// Function to generate dummy contacts
async function generateContacts(count: number): Promise<string[]> {
  const contactIds: string[] = [];
  const batchSize = 1000;
  
  try {
    for (let i = 0; i < count; i += batchSize) {
      const currentBatchSize = Math.min(batchSize, count - i);
      const contacts = Array(currentBatchSize).fill(null).map(() => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      const savedContacts = await Contact.insertMany(contacts);
      contactIds.push(...savedContacts.map(contact => contact._id.toString()));
      
      console.log(`Generated ${i + currentBatchSize} contacts`);
    }
    return contactIds;
  } catch (error) {
    console.error('Error generating contacts:', error);
    throw error;
  }
}

// Function to generate dummy messages
async function generateMessages(contactIds: string[], messageCount: number, messageContent: string[]): Promise<void> {
  const batchSize = 1000;
  const contentLength = messageContent.length;
  
  try {
    for (let i = 0; i < messageCount; i += batchSize) {
      const currentBatchSize = Math.min(batchSize, messageCount - i);
      const messages = Array(currentBatchSize).fill(null).map(() => {
        const randomContactId = contactIds[Math.floor(Math.random() * contactIds.length)];
        const randomContent = messageContent[Math.floor(Math.random() * contentLength)];
        
        return {
          contactId: randomContactId,
          content: randomContent,
          timestamp: getRandomDate(),
          createdAt: new Date(),
          updatedAt: new Date()
        };
      });

      await Message.insertMany(messages);
      console.log(`Generated ${i + currentBatchSize} messages`);
    }
  } catch (error) {
    console.error('Error generating messages:', error);
    throw error;
  }
}

// Main function to generate all dummy data
async function generateDummyData(): Promise<void> {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/workflow-builder';
    console.log(`Connecting to MongoDB at ${mongoUri}`);
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Contact.deleteMany({});
    await Message.deleteMany({});
    console.log('Cleared existing data');

    // Read message content
    console.log('Reading message content...');
    const messageContent = await readMessageContent();

    // Generate contacts
    console.log('Generating contacts...');
    const contactIds = await generateContacts(100000);

    // Generate messages
    console.log('Generating messages...');
    await generateMessages(contactIds, 5000000, messageContent);

    console.log('Data generation completed successfully');
  } catch (error) {
    console.error('Error in data generation:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
generateDummyData(); 
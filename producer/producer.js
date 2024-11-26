// producer.js
const { Queue } = require('bullmq');
const Redis = require('ioredis');

// Create a Redis connection with proper configuration
const connection = new Redis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null, // Set this to null as required by BullMQ
});

// Create a queue
const myQueue = new Queue('myQueue', { connection });

// Add a job to the queue
async function addJob() {
  console.log('Job added to the queue'); // Log job addition before adding
  await myQueue.add('logMessage', {
    message: 'Hello from BullMQ!',
  });
}

addJob().catch((err) => console.error('Error adding job:', err));

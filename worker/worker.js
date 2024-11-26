// worker.js
const { Worker } = require('bullmq');
const Redis = require('ioredis');

// Create a Redis connection with proper configuration
const connection = new Redis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null, // Set this to null as required by BullMQ
});

// Create a worker to process jobs from the queue
const myWorker = new Worker(
  'myQueue', // queue name
  async (job) => {
    console.log(`Processing job with message: ${job.data.message}`);
    
    // Simulate a delay of 5 seconds for job completion
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log('Job processing completed after 5 seconds');
    return 'Job done'; // This return value is logged in the completed handler
  },
  { connection }
);

myWorker.on('completed', (job) => {
  console.log(`Job completed with result: ${job.returnvalue}`);
});

myWorker.on('failed', (job, err) => {
  console.error(`Job failed with error: ${err.message}`);
});

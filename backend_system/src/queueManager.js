import amqp from "amqplib";

const QUEUE_NAME = "tasks";

// Connect to RabbitMQ server
async function connectToRabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://rabbitmq:5672");
    console.log(connection);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log("Connected to RabbitMQ");
    return channel;
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    throw error;
  }
}

// Enqueue a task
export const enqueueRequest = async (userId, request) => {
  const channel = await connectToRabbitMQ();

  channel.sendToQueue(
    QUEUE_NAME,
    Buffer.from(JSON.stringify({ userId, request })),
    { persistent: true }
  );

  console.log("Request enqueued:", userId, request);
};

// Dequeue a task
export const dequeueRequest = async () => {
  const channel = await connectToRabbitMQ();

  const message = await channel.get(QUEUE_NAME);
  if (message) {
    const task = JSON.parse(message.content.toString());
    console.log("Dequeued task:", task.userId, task.request);
    channel.ack(message);
    return task;
  }

  return null;
};

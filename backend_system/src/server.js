import express from 'express';
import { registerUser, loginUser } from './auth.js';
import { enqueueRequest } from './queueManager.js';
import { processQueue } from './worker.js';
import { initializeDatabase } from './database.js';
import promClient from 'prom-client';

const app = express();
app.use(express.json());

// Metrics setup
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_microseconds',
  help: 'Duration of HTTP requests in microseconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 5, 15, 50, 100, 500, 1000, 5000]
});

app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.route ? req.route.path : '', code: res.statusCode });
  });
  next();
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    await registerUser(username, password);
    res.status(201).send('User registered');
  } catch (err) {
    res.status(400).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await loginUser(username, password);
    res.status(200).send({ token });
  } catch (err) {
    res.status(400).send('Invalid credentials');
  }
});

app.post('/enqueue', async (req, res) => {
  const { userId, request } = req.body;
  try {
    await enqueueRequest(userId, request);
    processQueue(userId);
    res.status(200).send('Request enqueued');
  } catch (err) {
    res.status(400).send('Error enqueuing request');
  }
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

initializeDatabase().then(() => {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});

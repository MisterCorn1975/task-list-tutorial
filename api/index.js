import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import { fetchTasks, createTasks, updateTasks, deleteTasks } from './task.js';
const app = express();
const port = 3001;

app.use(express.json());

if (process.env.DEVELOPMENT) { 
  app.use(cors());
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/task', async(req, res) => {
  try {
    const tasks = await fetchTasks();
    res.send(tasks.Items);
  } 
  catch (error) {
    res.status(400).send('Error fetching tasks: ${err}');
  }
});

app.post('/task', async(req, res) => {
    try {
    const response = await createTasks(task);
    res.send(response.Item);
  } 
  catch (error) {
    res.status(400).send('Error creating task: ${err}');
  }
});

app.put('/task', async(req, res) => {
    try {
    const tasks = await updateTasks();
    res.send(tasks.Items);
  } 
  catch (error) {
    res.status(400).send('Error updating tasks: ${err}');
  }
});

app.delete('/task/:id', async(req, res) => {
    try {
    const tasks = await deleteTasks(req.params.id);
    res.send(tasks.Items);
  } 
  catch (error) {
    res.status(400).send('Error deleting task: ${err}');
  }
});

if (process.env.DEVELOPMENT) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);
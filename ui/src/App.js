import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AddTaskForm from './components/AddTaskForm';
import Task from './components/Task';
import axios from 'axios';
import { useState } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [task, setTask] = useState([]);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setTasks(data);

    } catch (error) {
      console.log('Error fetching tasks:', error);
    }
  } 

  useEffect(() => {
    fetchTasks();
  } , []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddTaskForm fetchTasks={fetchTasks}/>
      {tasks.map((task) => {
        return <Task task={task} key={task.id} fetchTasks={fetchTasks} />;
      })}
    </ThemeProvider>
  );
}

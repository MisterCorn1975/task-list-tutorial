import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { UpdateTaskForm } from './UpdateTaskForm';
import classnames from 'classnames';
import axios from 'axios';
import { API_URL } from '../utils';


const Task = ({ task , fetchTasks}) => {
  const {id, name, completed} = task;
  const [isComplete, setIsComplete] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateTaskComplete = async () => {
    try {
      await axios.put(API_URL, {
        id, name,
        completed: !isComplete,
      });
      setIsComplete((prev) => !prev);
    } catch (err) {
      console.log(err)
    }
    
  };
  
  const handleDeleteTask = async () => {
    try {
      await axios.delete(`${API_URL}/${task.id}`);
      await fetchTasks();
    } catch (err) {
      console.log(err)
    }
  };
  return (
    <div className="task">
        <div className={classnames("flex", {
            done: isComplete 
        })}>
            <Checkbox checked={isComplete} onChange={handleUpdateTaskComplete} />
            <Typography variant="h4">{name}</Typography>
        </div>
        <div classname="taskButtons">
            <Button variant="contained" onClick={() => setIsDialogOpen(true)} color="primary">
                <EditIcon />
            </Button>
            <Button variant="contained" onClick={handleDeleteTask} color="error">
                <DeleteIcon />
            </Button>
        </div>
        <UpdateTaskForm
          fetchTasks={fetchTasks}
          isDialogOpen={isDialogOpen} 
          setIsDialogOpen={setIsDialogOpen} 
          task={task}
        />
    </div>
  )
}

export default Task


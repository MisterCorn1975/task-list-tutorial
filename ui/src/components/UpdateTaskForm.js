import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { API_URL } from '../utils';
import axios from 'axios';

export const UpdateTaskForm = ({
    fetchTasks,
    isDialogOpen, 
    setIsDialogOpen, 
    task
  }) => {
    const {id, name, completed} = task;
    const [taskName, setTaskName] = useState(name);
    
    const handleUpdateTaskName = async () => {
        try {
            await axios.put(API_URL, {
                id, 
                name: taskName,
                completed,
            });
            await fetchTasks();
            setTaskName("");


        } catch (err) {
            console.log(err)
        }

    }
    return (
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <DialogTitle>Edit Task</DialogTitle>
            <div className='dialog'>
                <TextField 
                    size="small" 
                    label="Task" 
                    variant='outlined' 
                    onChange={(e) => setTaskName(e.target.value)} 
                />
                <Button 
                    variant="contained" 
                    onClick={async () => {
                        await handleUpdateTaskName();
                        setIsDialogOpen(false);
                    }}>
                    <CheckIcon />
                </Button>
            </div>
        </Dialog>
    )
}

export default UpdateTaskForm;

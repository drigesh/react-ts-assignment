import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function Popup({open, setOpen, newTask, setNewTask, handleClose, addList, addItemToList, idx}: any) {

  const isList = idx === -1;

  return (
    <div>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create {isList ? "Task" : "Sub Task"} </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label= {isList ? "Task" : "Sub Task"}
            fullWidth
            variant="standard"
            value={newTask}
            onChange={ e => {setNewTask(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={ () => {
            isList ? addList() : addItemToList(idx)
          } }>
            {isList ? 'Add List' : 'Add Item'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Popup
import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

const AddRoEditFacility = (props) => {

  const handleClose = () => {
    
  };

  return (
    <div>
    <Dialog
      open={props.openDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.title}
      </DialogTitle>
      <DialogContent>
        <TextField name="facility-name" value={props.facilityName} onChange={(e) => props.setFacilityName(e.target.value)}></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleCancel}>Cancel</Button>
        <Button onClick={props.handleOk} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}

export default AddRoEditFacility
import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

const AddOrEditRoom = (props) => {
  return (
    <Dialog
      open={props.openDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.selectedRoom.name? `แก้ไขห้อง ${props.selectedRoom.name}`:'เพิ่มห้อง'}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="room-name"
          value={props.selectedRoom?.name}
          onChange={(e) => props.setRoomName(e.target.value)}
        ></TextField>
        <TextField
          name="floor"
          label="Floor"
          value={props.selectedRoom?.floor}
          onChange={(e) => props.setRoomFloor(e.target.value)}
        ></TextField>
        <TextField
          name="capacityMax"
          label="Capacity"
          type="number"
          value={props.selectedRoom?.capacityMax}
          onChange={(e) => props.setRoomCapacityMax(e.target.value)}
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleCancel}>Cancel</Button>
        <Button disabled={props.isSaving} onClick={props.handleOk} autoFocus>
          {props.isSaving ? "Saving..." : "OK"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrEditRoom;

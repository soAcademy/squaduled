import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

const AddOrEditBuilding = (props) => {
  return (
    <Dialog
      open={props.openDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <TextField
          name="building-name"
          value={props.buildingName}
          onChange={(e) => props.setBuildingName(e.target.value)}
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

export default AddOrEditBuilding;


import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "70vh",
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  button: {
    marginBottom: theme.spacing(2),
    backgroundColor: "#4A7654",
    "&:hover": {
      backgroundColor: "#6e9176",
    },
    color: "white",
    width: 360,
    height: 60,
    borderRadius: "30px",
  },
}));


export default function MyComponent() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [participants, setParticipants] = useState(0);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');

  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // Handle form submission here
  };
  
  const navigate = useNavigate();
  
  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        เลือกอาคาร
      </Typography>
      <Button
        variant="contained"
        size="large" // set size to large
        className={classes.button}
      >
        อาคาร A
      </Button>
      <Button
        variant="contained"
        size="large" // set size to large
        className={classes.button}
      >
        อาคาร B
      </Button>
      <Button
        variant="contained"
        size="large" // set size to large
        className={classes.button}
      >
        อาคาร C
      </Button  >
      <Button onClick={() => navigate("/management-list")} className="absolute bottom-8 left-8 px-6 py-2 rounded-lg bg-[#4A7654] hover:bg-[#6e9176] text-center text-gray-200 text-sm">
        กลับ
      </Button>
      <Button
        variant="outlined" color="primary" onClick={handleOpen}
        className="absolute bottom-8  right-8 p-4 rounded-full bg-[#618833] hover:bg-[#a2cf6e] text-center text-gray-200 text-xl"
      >
        +
      </Button>
      
      <Dialog open={open} onClose={handleClose} className="p-5" >
      <DialogTitle  >สร้าง</DialogTitle>
        
        <TextField
          className={classes.input}
          placeholder="ชื่ออาคาร"
          variant="outlined"
          size="small"
          
        />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            กลับ
          </Button>
          <Button onClick={handleSubmit} color="primary" >
            บันทึก
          </Button>
        </DialogActions>
        
        
        </Dialog>
    </div>
  );
}




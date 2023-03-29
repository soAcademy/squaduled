import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, FormGroup, Switch, Paper, Typography } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    
  },
  paper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    
  },
  label: {
    marginLeft: theme.spacing(1),
  },
}));

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];



const ManageOfficeHour = () => {
  const classes = useStyles();
  const [switches, setSwitches] = useState(
    daysOfWeek.reduce((obj, day) => ({ ...obj, [day]: false }), {})
  );

  const handleChange = (event) => {
    setSwitches({ ...switches, [event.target.name]: event.target.checked });
  };

  const navigate = useNavigate();
  return (
     <div className={classes.root}>
      
      <Typography variant="h4" style={{ marginBottom: '1rem' }}>Settings</Typography>
      {daysOfWeek.map((day) => (
        <Paper key={day} className={classes.paper}>
          <Typography variant="body1" style={{ color: '#555' }}> 
            {day}
          </Typography>
          <FormGroup>
            <FormControlLabel
              className={classes.label}
              control={
                <Switch
                  checked={switches[day]}
                  onChange={handleChange}
                  name={day}
                  color="primary"
                />
                
              }
              
            />
            
          </FormGroup>
          
        </Paper>
      ))}
      <div>
      <Button onClick={() => navigate("/management-list")} className="absolute bottom-8 left-8 px-6 py-2 rounded-lg bg-[#4A7654] hover:bg-[#6e9176] text-center text-gray-200 text-sm">
        กลับ
      </Button>
      </div>
    </div>
    
  )
}

export default ManageOfficeHour
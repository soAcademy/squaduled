import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

function Agodo() {
  const [numParticipants, setNumParticipants] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Participants: ${numParticipants}`);
    console.log(`Date range: ${dateRange[0]} - ${dateRange[1]}`);
    console.log(`Start time: ${startTime}`);
    console.log(`End time: ${endTime}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Number of participants"
            value={numParticipants}
            onChange={(event) => setNumParticipants(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              startText="Booking date from"
              endText="Booking date to"
              value={dateRange}
              onChange={(newValue) => setDateRange(newValue)}
              inputFormat="dd/MM/yyyy"
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TimePicker
            label="Start time"
            value={startTime}
            onChange={(newValue) => setStartTime(newValue)}
            renderInput={(props) => <TextField {...props} />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TimePicker
            label="End time"
            value={endTime}
            onChange={(newValue) => setEndTime(newValue)}
            renderInput={(props) => <TextField {...props} />}
          />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" type="submit">
        Book room
      </Button>
    </form>
  );
}

export default Agodo;
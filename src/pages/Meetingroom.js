import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';

const MeetingRoomBooking = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [participants, setParticipants] = useState(0);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // Handle form submission here
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        จองห้องพัก
      </Button>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle  >ค้นหาห้องประชุม</DialogTitle>
        <DialogContent>
          <div className="text-xs">
          ชื่อผู้จองดึงมากการlog-in
          </div>
          <TextField
            margin="dense"
            label="จำนวนผู้เข้าร่วม"
            type="number"
            fullWidth
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>วันที่</InputLabel>
            <Select value={date} onChange={(e) => setDate(e.target.value)}>
              <MenuItem value={new Date()}>Today</MenuItem>
              <MenuItem value={new Date(Date.now() + 86400000)}>Tomorrow</MenuItem>
              {/* Add more date options here */}
            </Select>
            
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>ตั้งแต่</InputLabel>
            <Select value={time} onChange={(e) => setTime(e.target.value)}>
              <MenuItem value="09:00 AM">09:00 AM</MenuItem>
              <MenuItem value="10:00 AM">10:00 AM</MenuItem>
              {/* Add more time options here */}
            </Select>
            
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>ถึง</InputLabel>
            <Select value={time} onChange={(e) => setTime(e.target.value)}>
              <MenuItem value="09:00 AM">09:00 AM</MenuItem>
              <MenuItem value="10:00 AM">10:00 AM</MenuItem>
              {/* Add more time options here */}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            กลับ
          </Button>
          <Button onClick={handleSubmit} color="primary">
            ค้นหา
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MeetingRoomBooking;







// import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import Calendar from 'react-calendar';

// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: theme.spacing(4),
//   },
//   textField: {
//     margin: theme.spacing(1),
//     width: '100%',
//   },
//   calendar: {
//     margin: theme.spacing(1),
//   },
//   button: {
//     margin: theme.spacing(1),
//   },
// }));

// const MeetingRoomBookingPage = () => {
//   const classes = useStyles();
//   const [name, setName] = useState('');
//   const [numParticipants, setNumParticipants] = useState(0);
//   const [date, setDate] = useState(new Date());
//   const [time, setTime] = useState('');
//   const [duration, setDuration] = useState('');

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleNumParticipantsChange = (event) => {
//     setNumParticipants(event.target.value);
//   };

//   const handleDateChange = (value) => {
//     setDate(value);
//   };

//   const handleTimeChange = (event) => {
//     setTime(event.target.value);
//   };

//   const handleDurationChange = (event) => {
//     setDuration(event.target.value);
//   };

//   const handleSubmit = () => {
//     // Handle form submission here
//   };

//   return (
//     <div className={classes.container}>
//       <TextField
//         label="Name"
//         value={name}
//         onChange={handleNameChange}
//         className={classes.textField}
//       />
//       <TextField
//         type="number"
//         label="Number of Participants"
//         value={numParticipants}
//         onChange={handleNumParticipantsChange}
//         className={classes.textField}
//       />
//       <Calendar
//         value={date}
//         onChange={handleDateChange}
//         className={classes.calendar}
//       />
//       <TextField
//         label="Time"
//         value={time}
//         onChange={handleTimeChange}
//         className={classes.textField}
//       />
//       <TextField
//         type="number"
//         label="Duration (in minutes)"
//         value={duration}
//         onChange={handleDurationChange}
//         className={classes.textField}
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSubmit}
//         className={classes.button}
//       >
//         Book Meeting Room
//       </Button>
//     </div>
//   );
// };

// export default MeetingRoomBookingPage;
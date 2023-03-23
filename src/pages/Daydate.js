import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, FormGroup, Switch, Paper, Typography } from '@material-ui/core';

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

const WeekdaysSwitches = () => {
  const classes = useStyles();
  const [switches, setSwitches] = useState(
    daysOfWeek.reduce((obj, day) => ({ ...obj, [day]: false }), {})
  );

  const handleChange = (event) => {
    setSwitches({ ...switches, [event.target.name]: event.target.checked });
  };

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
    </div>
  );
};

export default WeekdaysSwitches;


















// import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { FormControlLabel, FormGroup, Switch, Paper, Typography } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     marginTop: theme.spacing(2),
//     marginBottom: theme.spacing(2),
//   },
//   paper: {
//     display: 'flex',
//     justifyContent: 'space-between', // aligns the items to opposite ends
//     alignItems: 'center',
//     padding: theme.spacing(2),
//     marginBottom: theme.spacing(2),
//   },
//   switch: {
//     marginLeft: theme.spacing(2), // adds some margin between the switch and the letter
//   },
// }));

// const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// const WeekdaysSwitches = () => {
//   const classes = useStyles();
//   const [switches, setSwitches] = useState(
//     daysOfWeek.reduce((obj, day) => ({ ...obj, [day]: false }), {})
//   );

//   const handleChange = (event) => {
//     setSwitches({ ...switches, [event.target.name]: event.target.checked });
//   };

//   return (
//     <div className={classes.root}>
//       {daysOfWeek.map((day) => (
//         <Paper key={day} className={classes.paper}>
//           <Typography variant="body1">{day}</Typography>
//           <FormGroup>
//             <FormControlLabel
//               className={classes.switch}
//               control={
//                 <Switch
//                   checked={switches[day]}
//                   onChange={handleChange}
//                   name={day}
//                   color="primary"
//                 />
//               }
//             />
//           </FormGroup>
//         </Paper>
//       ))}
//     </div>
//   );
// };

// export default WeekdaysSwitches;
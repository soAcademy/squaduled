import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
    backgroundColor: "#006400", 
    color: "white", 
    width: 800, 
    height: 60, 
  },
}));

export default function MyComponent() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        การจัดการ
      </Typography>
      <Button
        variant="contained"
        
        size="large" // set size to large
        className={classes.button}
      >
        จัดการอาคารและสถานที่
      </Button>
      <Button
        variant="contained"
        
        size="large" // set size to large
        className={classes.button}
      >
        จัดการสิ่งอำนวยความสะดวก
      </Button>
      <Button
        variant="contained"
        
        size="large" // set size to large
        className={classes.button}
      >
        จัดการวันที่/เวลา ให้บริการ
      </Button>
      <Button
        variant="contained"
        
        size="large" // set size to large
        className={classes.button}
      >
        จัดการรายการจอง
      </Button>
    </div>
  );
}




// *******************

// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100vh",
//   },
//   title: {
//     marginBottom: theme.spacing(4),
//   },
//   button: {
//     marginBottom: theme.spacing(2),
//     width: 200,
//     height: 60,
    // backgroundColor: "#006400", // set background color to dark green
    // color: "white", // set text color to white
//   },
// }));

// export default function MyComponent() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Typography variant="h5" className={classes.title}>
//         AAAA top in the middle
//       </Typography>
//       <Button
//         variant="contained"
//         className={classes.button}
//       >
//         Button 1
//       </Button>
//       <Button
//         variant="contained"
//         className={classes.button}
//       >
//         Button 2
//       </Button>
//       <Button
//         variant="contained"
//         className={classes.button}
//       >
//         Button 3
//       </Button>
//       <Button
//         variant="contained"
//         className={classes.button}
//       >
//         Button 4
//       </Button>
//     </div>
//   );
// }


// *******************
// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   longButton: {
//     width: '100%',
//     height: '60px',
//     borderRadius: '30px',
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//     '&:hover': {
//       backgroundColor: theme.palette.primary.dark,
//     },
//   },
//   buttonContainer: {
//     marginTop: theme.spacing(2),
//   },
//   columnButton: {
//     width: '100%',
//     height: '40px',
//     marginBottom: theme.spacing(1),
//     borderRadius: '20px',
//     backgroundColor: theme.palette.secondary.main,
//     color: theme.palette.secondary.contrastText,
//     '&:hover': {
//       backgroundColor: theme.palette.secondary.dark,
//     },
//   },
// }));

// const LongButton = () => {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Button variant="contained" className={classes.longButton}>
//         TTTT
//       </Button>
//       <Grid container spacing={2} className={classes.buttonContainer}>
//         <Grid item xs={12}>
//           <Button variant="contained" className={classes.columnButton}>
//             Button 1
//           </Button>
//         </Grid>
//         <Grid item xs={12}>
//           <Button variant="contained" className={classes.columnButton}>
//             Button 2
//           </Button>
//         </Grid>
//         <Grid item xs={12}>
//           <Button variant="contained" className={classes.columnButton}>
//             Button 3
//           </Button>
//         </Grid>
//         <Grid item xs={12}>
//           <Button variant="contained" className={classes.columnButton}>
//             Button 4
//           </Button>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default LongButton;

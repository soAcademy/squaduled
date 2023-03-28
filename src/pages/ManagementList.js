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

const ManagementList = () => {
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
      <div className="absolute bottom-8 left-8 px-6 py-2 rounded-lg bg-[#4A7654] hover:bg-[#6e9176] text-center text-gray-200 text-sm">
        กลับ
      </div>
    </div>
  );
};

export default ManagementList;

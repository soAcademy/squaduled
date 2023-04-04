import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "70vh",
    backgroundImage:
      "url('https://iflaapr.org/sites/default/files/inline-images/06-Urban%20Gallery%20Hyperlane-Lu%20Bing.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 6,
    color: '#fff',
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
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <Typography
        variant="h5"
        className={classes.title}
        className=" text-white pd-5 px-4 py-6"
      >
        การจัดการ
      </Typography>
      <Button
        onClick={() => navigate("/manage-building")}
        variant="contained"
        size="large" // set size to large
        className={classes.button}
      >
        จัดการอาคารและสถานที่
      </Button>
      <Button
        onClick={() => navigate("/manage-facility")}
        variant="contained"
        size="large" // set size to large
        className={classes.button}
      >
        จัดการสิ่งอำนวยความสะดวก
      </Button>
      <Button
        onClick={() => navigate("/manage-office-hour")}
        variant="contained"
        size="large" // set size to large
        className={classes.button}
      >
        จัดการวันที่/เวลา ให้บริการ
      </Button>
      <Button
        onClick={() => navigate("/room-booking-list")}
        variant="contained"
        size="large" // set size to large
        className={classes.button}
      >
        จัดการรายการจอง
      </Button>
      <Button
        onClick={() => navigate("/room-searching")}
        className="absolute bottom-8 left-8 px-6 py-2 rounded-lg bg-[#4A7654] hover:bg-[#6e9176] text-center text-gray-200 text-sm"
      >
        กลับ
      </Button>
    </div>
  );
};

export default ManagementList;

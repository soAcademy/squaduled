import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, IconButton } from "@mui/material";
import Typography from "@material-ui/core/Typography";
import Grow from "@mui/material/Grow";
import { useNavigate } from "react-router-dom";
import { IoAddCircle, IoArrowBackCircle } from "react-icons/io5";
import { useAuth } from "../context/auth";


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
  const auth = useAuth();
  const navigate = useNavigate();
  const lists = [
    { manage: "จัดการห้องประชุม", path: "/manage-building" },
    { manage: "จัดการสิ่งอำนวยความสะดวก", path: "/manage-facility" },
    { manage: " จัดการวัน/เวลา ให้บริการ", path: "/manage-office-hour" },
    { manage: "จัดการรายการจอง", path: "/room-booking-list" },
  ];

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        การจัดการ
      </Typography>
      {lists.map((list, i) => {
        return (
          <Grow
            in
            style={{ transformOrigin: "0 0 0" }}
            {...{ timeout: i * 500 }}
          >
            <Button
              onClick={() => navigate(list.path)}
              variant="contained"
              size="large" // set size to large
              className={classes.button}
            >
              {list.manage}
            </Button>
          </Grow>
        );
      })}
      <div className="w-full fixed bottom-0">
        <IconButton
          onClick={() => navigate("/")}
          className="fixed float-left left-8 bottom-8 text-6xl text-[#4A7654] hover:text-[#6e9176]"
        >
          <IoArrowBackCircle />
        </IconButton>
      </div>
    </div>
  );
};

export default ManagementList;

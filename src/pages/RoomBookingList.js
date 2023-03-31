import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
var utc = require('dayjs/plugin/utc')
const localizedFormat = require("dayjs/plugin/localizedFormat");
const dayjs = require("dayjs");
dayjs.extend(utc)
dayjs.extend(localizedFormat);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  paper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: "#f5f5f5",
  },
  label: {
    marginLeft: theme.spacing(1),
  },
}));

const RoomBookingList = () => {
  const [bookings, setBookings] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://squaduled-api-2miz.vercel.app/squaduled/getAllBooking",
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setBookings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();
  return (
    <div className={classes.root}>
      <Typography variant="h4" style={{ marginBottom: "1rem" }}>
        Bookings
      </Typography>
      {bookings.map((booking) => {
        const date = new Date(booking.startDatetime).toDateString()
        const startTime = booking.startDatetime.substring(11, 16);
        const endTime = booking.endDatetime.substring(11, 16);
        return (
        <Paper key={booking.id} className={classes.paper}>
          <Typography variant="body1" style={{ color: "#555" }}>
            {booking.room.name} by {booking.user.firstName} at {date} from {startTime} to {endTime}
          </Typography>
        </Paper>
      )})}
      <div className="w-full fixed bottom-0">
        <Button
          onClick={() => navigate("/management-list")}
          className="fixed float-left left-8 bottom-8 px-6 py-2 rounded-lg bg-[#4A7654] hover:bg-[#6e9176] text-center text-gray-200 text-sm"
        >
          กลับ
        </Button>
      </div>
    </div>
  );
};

export default RoomBookingList;

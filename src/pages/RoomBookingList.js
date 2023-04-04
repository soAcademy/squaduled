import React, { useState, useEffect } from "react";
import Grow from "@mui/material/Grow";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import { IoAddCircle, IoArrowBackCircle } from "react-icons/io5";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import * as appConfig from "../AppConfig";
import { useAuth } from "../context/auth";
import Swal from "sweetalert2";
var utc = require("dayjs/plugin/utc");
const localizedFormat = require("dayjs/plugin/localizedFormat");
const dayjs = require("dayjs");
dayjs.extend(utc);
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
    backgroundColor: "#ebebeb",
  },
  label: {
    marginLeft: theme.spacing(1),
  },
  title: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

const RoomBookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const classes = useStyles();
  const auth = useAuth();

  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Confirm delete ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBookings(id);
      }
    });
  };

  const deleteBookings = (id) => {
    const data = JSON.stringify({
      id: id,
    });

    const config = {
      method: "post",
      url: `${appConfig.API_URL}/squaduled/deleteBooking`,
      headers: {
        Authorization: auth.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        getAllBookings();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllBookings = () => {
    setShowLoading(true);
    const config = {
      method: "post",
      url: `${appConfig.API_URL}/squaduled/getAllBooking`,
      headers: {
        Authorization: auth.token,
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
      })
      .finally(() => {
        setShowLoading(false);
      });
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="mb-32 text-center">
      <Typography align="center" variant="h5" className={classes.title}>
        รายการจอง
      </Typography>
      {showLoading && <CircularProgress color="success" />}
      {bookings.map((booking, i) => {
        const date = new Date(booking.startDatetime).toDateString();
        const startTime = booking.startDatetime.substring(11, 16);
        const endTime = booking.endDatetime.substring(11, 16);
        return (
          <Grow
            in
            style={{ transformOrigin: "0 0 0" }}
            {...{ timeout: i * 500 }}
          >
            <Paper key={booking.id} className={classes.paper}>
              <Typography style={{ color: "#555" }}>
                {`${booking.room.name} by ${booking.user.firstName} at 
              ${date} from ${startTime} to ${endTime}`}
              </Typography>
              <ButtonGroup>
                {auth.role === "admin" && (
                  <IconButton
                    // className="border border-gray-100 text-gray-100"
                    onClick={() => handleDelete(booking.id, booking.name)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </ButtonGroup>
            </Paper>
          </Grow>
        );
      })}
      <div className="w-full fixed bottom-0">
        <IconButton
          onClick={() =>
            navigate(auth.role === "admin" ? "/management-list" : "/")
          }
          className="fixed float-left left-8 bottom-8 text-6xl text-[#4A7654] hover:text-[#6e9176]"
        >
          <IoArrowBackCircle />
        </IconButton>
      </div>
    </div>
  );
};

export default RoomBookingList;

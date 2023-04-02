import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControlLabel,
  FormGroup,
  Switch,
  Paper,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import * as appConfig from "../AppConfig";
import Swal from "sweetalert2";

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
    justifyContent: "flex-start",
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

const ManageOfficeHour = () => {
  const classes = useStyles();
  const [officeHourObject, setOfficeHourObject] = useState({
    // id: 1,
    // isOpenMonday: true,
    // openingTimeMonday: "08:00:00",
    // closingTimeMonday: "17:00:00",
    // isOpenTuesday: true,
    // openingTimeTuesday: "08:00:00",
    // closingTimeTuesday: "17:00:00",
    // isOpenWednesday: true,
    // openingTimeWednesday: "08:00:00",
    // closingTimeWednesday: "17:00:00",
    // isOpenThursday: true,
    // openingTimeThursday: "08:00:00",
    // closingTimeThursday: "17:00:00",
    // isOpenFriday: true,
    // openingTimeFriday: "08:00:00",
    // closingTimeFriday: "17:00:00",
    // isOpenSaturday: false,
    // openingTimeSaturday: "08:00:00",
    // closingTimeSaturday: "17:00:00",
    // isOpenSunday: false,
    // openingTimeSunday: "08:00:00",
    // closingTimeSunday: "17:00:00",
  });

  const handleChangeOpenClose = (day) => {
    console.log(day);
    let newObject = {
      ...officeHourObject,
    };
    newObject[`isOpen${day}`] = !officeHourObject[`isOpen${day}`];
    setOfficeHourObject(newObject);
  };

  const handleChangeTimeOpenClose = (day, type, newValue) => {
    let newObject = {
      ...officeHourObject,
    };
    newObject[`${type}Time${day}`] = newValue;
    setOfficeHourObject(newObject);
  };

  const handleSave = () => {
    updateOfficeHour().then((res) =>{
      Swal.fire(
        'สำเร็จ!',
        'บันทึกการตั้งค่าเรียบร้อยแล้ว',
        'success'
      )
    }).catch((err)=>{
      Swal.fire(
        'แย่แล้ว!',
        'การบันทึกล้มเหลว',
        'error'
      )
    })
  };

  const updateOfficeHour = () => {
    const data = JSON.stringify(officeHourObject);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${appConfig.API_URL}/squaduled/updateOfficeHour2`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

   return axios.request(config)

  };

  useEffect(() => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${appConfig.API_URL}/squaduled/getAllOfficeHour2`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setOfficeHourObject(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(officeHourObject);
  }, [officeHourObject]);

  const navigate = useNavigate();

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className={classes.root}>
      <Typography variant="h4" style={{ marginBottom: "1rem" }}>
        Settings
      </Typography>
      {officeHourObject.id && daysOfWeek.map((day) => {
        return (
          <Paper key={day} className={classes.paper}>
            <Typography variant="body1" style={{ color: "#555" }}>
              {day}
            </Typography>
            <FormGroup>
              <FormControlLabel
                className={classes.label}
                control={
                  <Switch
                    checked={officeHourObject[`isOpen${day}`]}
                    onChange={() => handleChangeOpenClose(day)}
                    name={day}
                    color="primary"
                  />
                }
              />
            </FormGroup>
            <FormGroup>
              <TextField
                disabled={!officeHourObject[`isOpen${day}`]}
                value={officeHourObject[`openingTime${day}`]}
                inputProps={{ maxLength: 8 }}
                onChange={(e) => {
                  handleChangeTimeOpenClose(day, "opening", e.target.value);
                }}
                label="Open"
              />
            </FormGroup>
            <FormGroup>
              <TextField
                disabled={!officeHourObject[`isOpen${day}`]}
                value={officeHourObject[`closingTime${day}`]}
                onChange={(e) => {
                  handleChangeTimeOpenClose(day, "closing", e.target.value);
                }}
                inputProps={{ maxLength: 8 }}
                label="Close"
              />
            </FormGroup>
          </Paper>
        );
      })}

      <div className="w-full fixed bottom-0">
        <Button
          onClick={() => navigate("/management-list")}
          className="fixed float-left left-8 bottom-8 px-6 py-2 rounded-lg bg-[#4A7654] hover:bg-[#6e9176] text-center text-gray-200 text-sm"
        >
          กลับ
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className="fixed  float-right  right-8 bottom-8 p-4 rounded-full bg-[#618833] hover:bg-[#a2cf6e] text-center text-gray-200 text-xl"
          onClick={() => handleSave()}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ManageOfficeHour;

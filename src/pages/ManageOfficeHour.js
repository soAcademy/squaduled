import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControlLabel,
  FormGroup,
  Switch,
  Paper,
  Typography,
  Grow,
  IconButton,
  ButtonGroup,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import * as appConfig from "../AppConfig";
import Swal from "sweetalert2";
import { useAuth } from "../context/auth";
import { IoCheckmarkCircleSharp, IoArrowBackCircle } from "react-icons/io5";

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
    background: "#ebebeb",
  },
  label: {
    marginLeft: theme.spacing(1),
  },
  title: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  switch_track: {
    backgroundColor: "#f50057",
  },
  switch_base: {
    color: "#f50057",
    "&.Mui-disabled": {
      color: "#e886a9",
    },
    "&.Mui-checked": {
      color: "#95cc97",
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#4CAF50",
    },
  },
  switch_primary: {
    "&.Mui-checked": {
      color: "#4CAF50",
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#4CAF50",
    },
  },
}));

const ManageOfficeHour = () => {
  const auth = useAuth();
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
  const [showLoading, setShowLoading] = useState(false);

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
    updateOfficeHour()
      .then((res) => {
        Swal.fire("สำเร็จ!", "บันทึกการตั้งค่าเรียบร้อยแล้ว", "success");
      })
      .catch((err) => {
        Swal.fire("แย่แล้ว!", "การบันทึกล้มเหลว", "error");
      });
  };

  const updateOfficeHour = () => {
    const data = JSON.stringify(officeHourObject);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${appConfig.API_URL}/squaduled/updateOfficeHour2`,
      headers: {
        Authorization: auth.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    return axios.request(config);
  };

  useEffect(() => {
    setShowLoading(true);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${appConfig.API_URL}/squaduled/getAllOfficeHour2`,
      headers: {
        Authorization: auth.token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setOfficeHourObject(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setShowLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log(officeHourObject);
  }, [officeHourObject]);

  const navigate = useNavigate();

  const daysOfWeek = [
    { fullName: "Monday", abvName: "MON" },
    { fullName: "Tuesday", abvName: "TUE" },
    { fullName: "Wednesday", abvName: "WED" },
    { fullName: "Thursday", abvName: "THU" },
    { fullName: "Friday", abvName: "FRI" },
    { fullName: "Saturday", abvName: "SAT" },
    { fullName: "Sunday", abvName: "SUN" },
  ];

  return (
    <div>
      <Typography align="center" variant="h5" className={classes.title}>
        จัดการวันเวลา ให้บริการ
      </Typography>
      <div className="mb-32 text-center">
        {showLoading && <CircularProgress color="success" />}
        {officeHourObject.id &&
          daysOfWeek.map((day, i) => {
            return (
              <Grow
                in
                style={{ transformOrigin: "0 0 0" }}
                {...{ timeout: i * 500 }}
              >
                <Paper key={day.abvName} className={classes.paper}>
                  <Typography variant="body1" style={{ color: "#555" }}>
                    {day.abvName}
                  </Typography>
                  <br />
                  <FormGroup>
                    <FormControlLabel
                      className={classes.label}
                      control={
                        <Switch
                          classes={{
                            track: classes.switch_track,
                            switchBase: classes.switch_base,
                            colorPrimary: classes.switch_primary,
                          }}
                          checked={officeHourObject[`isOpen${day.fullName}`]}
                          onChange={() => handleChangeOpenClose(day.fullName)}
                          name={day.fullName}
                        />
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <TextField
                      disabled={!officeHourObject[`isOpen${day.fullName}`]}
                      value={officeHourObject[`openingTime${day.fullName}`]}
                      inputProps={{ maxLength: 8 }}
                      onChange={(e) => {
                        handleChangeTimeOpenClose(
                          day.fullName,
                          "opening",
                          e.target.value
                        );
                      }}
                      label="Open"
                    />
                  </FormGroup>
                  <FormGroup>
                    <TextField
                      disabled={!officeHourObject[`isOpen${day.fullName}`]}
                      value={officeHourObject[`closingTime${day.fullName}`]}
                      onChange={(e) => {
                        handleChangeTimeOpenClose(
                          day.fullName,
                          "closing",
                          e.target.value
                        );
                      }}
                      inputProps={{ maxLength: 8 }}
                      label="Close"
                    />
                  </FormGroup>
                </Paper>
              </Grow>
            );
          })}
      </div>

      <div className="w-full fixed bottom-0">
        <IconButton
          onClick={() => navigate("/management-list")}
          className="fixed float-left left-8 bottom-8 text-6xl text-[#4A7654] hover:text-[#6e9176]"
        >
          <IoArrowBackCircle />
        </IconButton>
        <IconButton
          variant="outlined"
          color="primary"
          className="fixed  float-right  right-8 bottom-8 text-6xl text-[#4A7654] hover:text-[#6e9176"
          onClick={() => handleSave()}
        >
          <IoCheckmarkCircleSharp />
        </IconButton>
      </div>
    </div>
  );
};

export default ManageOfficeHour;

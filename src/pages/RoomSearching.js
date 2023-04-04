import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import * as appConfig from "../AppConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const localizedFormat = require("dayjs/plugin/localizedFormat");
const dayjs = require("dayjs");
dayjs.extend(localizedFormat);

const RoomSearching = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTimeStart, setSelectedTimeStart] = useState(
    dayjs("2000-01-01T08:00")
  );
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(
    dayjs("2000-01-01T08:30")
  );
  const [isOfficeHour, setIsOfficeHour] = useState(true);
  const [capacity, setCapacity] = useState(0);
  const [startDatetime, setStartDatetime] = useState("");
  const [endDatetime, setEndDatetime] = useState("");

  const checkIsOfficeHours = () => {
    setShowLoading(true);
    const data = JSON.stringify({
      startDatetime: startDatetime,
      endDatetime: endDatetime,
    });

    const config = {
      method: "post",
      url: `${appConfig.API_URL}/squaduled/checkIsOfficeHour`,
      headers: {
        Authorization: auth.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        const responseData = response.data;
        if (responseData.result === true) {
          navigate(`/result-room/${capacity}/${startDatetime}/${endDatetime}`);
        } else {
          setIsOfficeHour(false);
        }

      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setShowLoading(false);
      });
  };

  useEffect(() => {
    const formatDate = dayjs(selectedDate).format("YYYY-MM-DD");
    const formatStartTime = dayjs(selectedTimeStart).format("HH:mm:ss.SSS");
    const _startDatetime = `${formatDate} ${formatStartTime}`;

    setStartDatetime(_startDatetime);
  }, [selectedDate, selectedTimeStart]);

  useEffect(() => {
    const formatDate = dayjs(selectedDate).format("YYYY-MM-DD");
    const formatEndTime = dayjs(selectedTimeEnd).format("HH:mm:ss.SSS");
    const _endDatetime = `${formatDate} ${formatEndTime}`;

    setEndDatetime(_endDatetime);
  }, [selectedDate, selectedTimeEnd]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <Typography
          align="center"
          variant="h5"
        >{`สวัสดีคุณ ${auth.firstName}`}</Typography>
        <Typography align="center">
          กรุณาเลือกเวลาที่ต้องการใช้ห้องประชุม
        </Typography>
      </div>

      <div className="bg-[#fff] shadow-lg shadow-gray-600 p-4 m-4 rounded-lg md:w-1/3 xs:w-full">
        <Typography align="center" variant="h5">
          ค้นหาห้องประชุม
        </Typography>

        <div className="mt-3">
          <Box component="form" noValidate autoComplete="off">
            <TextField
              id="outlined-number"
              fullWidth
              label="จำนวนผู้ประชุม"
              type="number"
              value={capacity}
              onChange={(event) => {
                setCapacity(event.target.value);
              }}
            />
          </Box>
        </div>
        <br />
        <div>
          <DatePicker
            value={selectedDate}
            disablePast
            closeOnSelect
            onChange={(newValue) => setSelectedDate(newValue)}
            label="วันที่"
            slotProps={{ textField: { fullWidth: true } }}
          />
        </div>
        <br />
        <div className="flex ">
          <div>
            <TimePicker
              // ampm={false}
              ampmInClock
              label="ตั้งแต่"
              value={selectedTimeStart}
              onChange={(newValue) => setSelectedTimeStart(newValue)}
            />
          </div>
          <div className="ml-5">
            <TimePicker
              // ampm={false}
              ampmInClock
              label="ถึง"
              value={selectedTimeEnd}
              onChange={(newValue) => setSelectedTimeEnd(newValue)}
            />
          </div>
        </div>
        <br />

        <div className="text-center">
          {!isOfficeHour && (
            <div className="pb-4">
              <Typography align="center" className="text-red-500">
                ไม่อยู่ในช่วงเวลาทำการ
              </Typography>
            </div>
          )}
          <div>
            {showLoading && <CircularProgress color="success" />}

            <Button
              variant="contained"
              fullWidth
              className="bg-[#4A7654]"
              onClick={checkIsOfficeHours}
            >
              ค้นหา
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSearching;

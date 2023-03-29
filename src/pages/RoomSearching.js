import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// import dayjs from "dayjs";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const localizedFormat = require("dayjs/plugin/localizedFormat");
const dayjs = require("dayjs");
dayjs.extend(localizedFormat);

const RoomSearching = () => {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTimeStart, setSelectedTimeStart] = useState(
    dayjs("2000-01-01T08:00")
  );
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(
    dayjs("2000-01-01T08:00")
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
      url: "https://squaduled-api-2miz.vercel.app/squaduled/checkIsOfficeHour",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        const responseData = response.data;
        if (responseData.result === true) {
          // alert("ok");
          navigate("/result-room");
        } else {
          setIsOfficeHour(false);
        }
        // console.log(JSON.stringify(response.data));
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
    <div>
      <div>
        <div>
          <h1 className="text-sm">สวัสดีคุณเค้ก</h1>
          <h1 className="text-sm">กรุณากรอกข้อมูลด้านล่าง</h1>
        </div>
      </div>
      <div className="bg-gray-200 p-1 m-1 rounded-lg">
        <div>
          <h1 className="text-sm">ค้นหาห้องประชุม</h1>
        </div>

        <div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-number"
                label="จำนวนผู้ประชุม"
                type="number"
                value={capacity}
                // InputLabelProps={{
                //   shrink: true,
                // }}
                onChange={(event) => {
                  setCapacity(event.target.value);
                }}
              />
            </div>
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
          />
        </div>
        <br />
        <div className="flex justify-between">
          <div>
            <TimePicker
              // ampm={false}
              ampmInClock
              label="ตั้งแต่"
              value={selectedTimeStart}
              onChange={(newValue) => setSelectedTimeStart(newValue)}
            />
          </div>
          <div>
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

        <div>
          {!isOfficeHour && (
            <div className="pb-4">
              <Typography variant="h6" className="text-red-500">
                ไม่อยู่ในช่วงเวลาทำการ
              </Typography>
            </div>
          )}
          <div>
            {showLoading && (
              <CircularProgress color="success" />
            )}

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

import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======

>>>>>>> 2589fe349ad53c194ffe53c2d536a9f7ef26d4fb
import { Button, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import axios from "axios";

const RoomSearching = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTimeStart, setSelectedTimeStart] = useState(
    dayjs("2000-01-01T08:00")
  );
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(
    dayjs("2000-01-01T08:00")
  );
  const [isOfficeHour, setIsOfficeHour] = useState(true);
  const [capacity, setCapacity] = useState(0);

=======

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTimeStart, setSelectedTimeStart] = useState(
    dayjs("2000-01-01T08:00")
  );
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(
    dayjs("2000-01-01T08:00")
  );
  const [isOfficeHour, setIsOfficeHour] = useState(true);
  const [capacity, setCapacity] = useState(0);

>>>>>>> 2589fe349ad53c194ffe53c2d536a9f7ef26d4fb
  const checkIsOfficeHours = () => {
    let data = JSON.stringify({
      startDatetime: "2023-03-27 16:00:00.000",
      endDatetime: "2023-03-27 17:00:00.000",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3200/squaduled/checkIsOfficeHour",
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
<<<<<<< HEAD
          navigate("/result-room");
=======
          // navigate("/result-room");
>>>>>>> 2589fe349ad53c194ffe53c2d536a9f7ef26d4fb
        } else {
          setIsOfficeHour(false);
        }
        // console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

<<<<<<< HEAD
  // const handleChange = (event) => {
  //   setCapacity(event.target.value);
  // };

=======
  // const handleChange = () => {
  //   setCapacity(event.target.value);
  // };

  const numbers = Array.from({ length: 31 }, (_, i) => i);
>>>>>>> 2589fe349ad53c194ffe53c2d536a9f7ef26d4fb
  // useEffect(() => {
  //   console.log("Date:", selectedDate);
  //   console.log("Start:", selectedTimeStart);
  //   console.log("End:", selectedTimeEnd);
  // }, [selectedDate, selectedTimeStart, selectedTimeEnd]);

  return (
    <div>
      <div>
        <div item>
          <h1 className="text-sm">สวัสดีคุณเค้ก</h1>
          <h1 className="text-sm">กรุณากรอกข้อมูลด้านล่าง</h1>
        </div>
      </div>
      <div className="bg-gray-200 p-1 m-1 rounded-lg">
        <div item>
          <h1 className="text-sm">ค้นหาห้องประชุม</h1>
        </div>

        <div>
<<<<<<< HEAD
          <Box
=======
        <Box
>>>>>>> 2589fe349ad53c194ffe53c2d536a9f7ef26d4fb
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
            <Button
              variant="contained"
              fullWidth
              className="bg-[#4A7654]"
<<<<<<< HEAD
              onClick={checkIsOfficeHours}
=======
              // onClick={checkIsOfficeHours}
>>>>>>> 2589fe349ad53c194ffe53c2d536a9f7ef26d4fb
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

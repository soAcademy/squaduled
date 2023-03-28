import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import ResultRoomFilterFacility from "../components/ResultRoomFilterFacility";
import ResultRoomLists from "../components/ResultRoomLists";
import ResultRoomUserRequest from "../components/ResultRoomUserRequest";
import dayjs from "dayjs";
import axios from "axios";
const ResultRoom = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [facilities, setFacilities] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [capacity, setCapacity] = useState(5);
  const [showProgressRoomList, setShowProgressRoomList] = useState(false)
  const [showProgressFacilities, setShowProgressFacilities] = useState(false)
  const [selectedTimeStart, setSelectedTimeStart] = useState(
    dayjs("2022-03-23T08:00")
  );
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(
    dayjs("2022-03-23T10:00")
  );

  const loadFacility = () => {
    setShowProgressFacilities(true)
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://squaduled-api-2miz.vercel.app/squaduled/getAllFacility",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setFacilities(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setShowProgressFacilities(false)
      });
  };

  const loadAvailableRooms = () => {
    setShowProgressRoomList(true);
    let data = JSON.stringify({
      capacity: capacity,
      startDatetime: selectedTimeStart,
      endDatetime: selectedTimeEnd,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://squaduled-api-2miz.vercel.app/squaduled/checkAvailableRoom",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setAvailableRooms(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setShowProgressRoomList(false)
      });
  };

  useEffect(() => {
    loadFacility();
    loadAvailableRooms();
  }, []);

  return (
    <div className="w-full">
      <ResultRoomUserRequest />
      <br />
    {showProgressFacilities && <CircularProgress color="success" />}
      <ResultRoomFilterFacility
        facilities={facilities}
        setSelectedItem={setSelectedItem}
      />
      {showProgressRoomList && <CircularProgress color="success" />}
       
      <ResultRoomLists
        availableRooms={availableRooms}
        setSelectedRoom={setSelectedRoom}
      />
      <div>
        <div
          onClick={() => navigate("/")}
          className="fixed w-1/6 absolute float-left left-8 bottom-8 py-2 rounded-lg bg-[#4A7654] text-center text-gray-200 text-sm"
        >
          Back
        </div>
        <div className="fixed bottom-0 w-full">
          <button className="my-8 ml-auto px-5 py-2 bg-red-500 text-white text-sm font-bold tracking-wide rounded-full focus:outline-none">
            Next(Quiz)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultRoom;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [selectedTimeStart, setSelectedTimeStart] = useState(
    dayjs("2022-03-23T08:00")
  );
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(
    dayjs("2022-03-23T10:00")
  );

  const loadFacility = () => {
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
      });
  };

  const loadAvailableRooms = () => {
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
      <ResultRoomFilterFacility
        facilities={facilities}
        setSelectedItem={setSelectedItem}
      />
      <ResultRoomLists
        availableRooms={availableRooms}
        setSelectedRoom={setSelectedRoom}
      />
      <div>
        <div
          onClick={() => navigate("/")}
          className="w-1/6 absolute left-8 bottom-8 py-2 rounded-lg bg-[#4A7654] text-center text-gray-200 text-sm"
        >
          Back
        </div>
      </div>
    </div>
  );
};

export default ResultRoom;

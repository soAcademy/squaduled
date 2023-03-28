<<<<<<< HEAD
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
      url: "http://localhost:3200/squaduled/getAllFacility",
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
      url: "http://localhost:3200/squaduled/checkAvailableRoom",
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
=======
import React, { useState } from "react";

const ResultRoom = () => {
  const [selectedItem, setSelectedItem] = useState([]);

  const facilities = [
    { id: 1, name: "WIFI" },
    { id: 2, name: "Projector" },
    { id: 3, name: "Printer" },
    { id: 4, name: "Whiteboard" },
    { id: 5, name: "Socket" },
    { id: 6, name: "Water" },
    { id: 7, name: "Coffee" },
    { id: 8, name: "Pointer" },
    { id: 9, name: "Speaker" },
    { id: 10, name: "Microphone" },
  ];
return (
    <div className="w-full">
      <div className="sticky top-0 p-5 drop-shadow shadow-blue-600 bg-[#4A7654] -mx-8">
        Navbar
      </div>
      <div>
        <h1 className="text-sm">คุณ ประสิทธิ วงศ์แสง รหัสพนักงาน 202308</h1>
        <h1 className="text-sm">
          ต้องการใช้ห้องประชุมวันที่ 26 มิถุนายน 2023{" "}
        </h1>
        <h1 className="text-sm">เวลา 8.00 ถึง 12.00 น.</h1>
        <h1 className="text-sm">จำนวนผู้เข้าประชุม 5 ท่าน</h1>
      </div>
      <br />
      <div className="text-lg font-bold">อุปกรณ์ที่ต้องการ</div>
      <div className="relative flex items-center justify-center w-full overflow-hidden">
        <div className="relative flex items-center justify-center w-full">
          <ul className="flex list-none ml-0 -mx-4 overflow-x-auto scrollbar-none">
            {facilities.map((item) => (
              <li
                key={item.id}
                className="mx-4 py-4 text-gray-800 cursor-pointer hover:text-black"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-lg text-center font-bold mb-2">
        ห้องว่าง/ไม่มีห้องว่าง
      </div>
      <div className="relative items-center justify-center text-center w-full overflow-hidden">
        {facilities.map((item) => (
          <div
            key={item.id}
            className="bg-gray-200 rounded-lg mx-4 mb-1 py-4 text-gray-800 cursor-pointer hover:text-black"
          ><h1>{item.name}</h1>
            <button className="px-6 py-2 rounded-lg bg-[#4A7654] text-center text-gray-200 text-sm">จอง</button>
          </div>
        ))}
      </div>
      <div>
        <div className="absolute bottom-8 left-8 px-6 py-2 rounded-lg bg-[#4A7654] text-center text-gray-200 text-sm">
>>>>>>> 2589fe349ad53c194ffe53c2d536a9f7ef26d4fb
          Back
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default ResultRoom;
=======
export default ResultRoom;
>>>>>>> 2589fe349ad53c194ffe53c2d536a9f7ef26d4fb

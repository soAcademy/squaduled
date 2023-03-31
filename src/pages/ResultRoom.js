import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@material-ui/core/Button";
import ResultRoomFilterFacility from "../components/ResultRoomFilterFacility";
import ResultRoomLists from "../components/ResultRoomLists";
import ResultRoomUserRequest from "../components/ResultRoomUserRequest";
import dayjs from "dayjs";
import axios from "axios";
const ResultRoom = () => {
  const navigate = useNavigate();
  const [selectedFacilities, setSelectedFacilities] = React.useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [facilities, setFacilities] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [availableRoomsFilterd, setAvailableRoomsFilterd] = useState([])
  const [showProgressRoomList, setShowProgressRoomList] = useState(false);

  // +++++++++++++++ MOCKING data recieved from page roomsearch +++++++++++++++++
  const capacity = 5;
  const selectedTimeStart = dayjs("2022-03-23T08:00");
  const selectedTimeEnd = dayjs("2022-03-23T10:00");
 // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


  const loadAvailableRooms = () => {
    setShowProgressRoomList(true);
    const data = JSON.stringify({
      capacity: capacity,
      startDatetime: selectedTimeStart,
      endDatetime: selectedTimeEnd,
    });

    const config = {
      method: "post",
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
        setShowProgressRoomList(false);
      });
  };

  useEffect(() => {
    loadAvailableRooms();
  }, []);

  useEffect(() => {

    if (availableRooms) {
      const filtered = availableRooms?.map(room => {
        const facilityIdList = room.roomFacilities?.map(facility => facility.facilityId);
        return {...room,facilityIdList}
      }).filter(room => selectedFacilities.every(val => room.facilityIdList.includes(val)))
      // .filter((room) =>
      //   selectedFacilities.includes(
      //     room.facilities.map((facility) => {return facility.facilityId})
      //   )
      // );
      setAvailableRoomsFilterd(filtered);
    }

  }, [selectedFacilities,availableRooms]);
  

  return (
    <div className="w-full">
      <ResultRoomUserRequest />
      <br />

      <ResultRoomFilterFacility
        selectedFacilities={selectedFacilities}
        setSelectedFacilities={setSelectedFacilities}
        facilities={facilities}
      />
      {showProgressRoomList && <CircularProgress color="success" />}
      {/* {JSON.stringify(selectedFacilities)}
      {JSON.stringify(availableRoomsFilterd)} */}
      <ResultRoomLists
        availableRoomsFilterd={availableRoomsFilterd}
        setSelectedRoom={setSelectedRoom}
      />
      <div className="w-full fixed bottom-0">
        <Button
          onClick={() => navigate("/manage-building")}
          className="fixed float-left left-8 bottom-8 px-6 py-2 rounded-lg bg-[#4A7654] hover:bg-[#6e9176] text-center text-gray-200 text-sm"
        >
          กลับ
        </Button>
      </div>
    </div>
  );
};

export default ResultRoom;

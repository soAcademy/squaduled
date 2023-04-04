import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import ResultRoomFilterFacility from "../components/ResultRoomFilterFacility";
import ResultRoomLists from "../components/ResultRoomLists";
import ResultRoomUserRequest from "../components/ResultRoomUserRequest";
import { IconButton } from "@mui/material";
import { IoAddCircle, IoArrowBackCircle } from "react-icons/io5";
import dayjs from "dayjs";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as appConfig from "../AppConfig";
import { useAuth } from "../context/auth";

const ResultRoom = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [selectedFacilities, setSelectedFacilities] = React.useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [facilities, setFacilities] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [availableRoomsFilterd, setAvailableRoomsFilterd] = useState([]);
  const [showProgressRoomList, setShowProgressRoomList] = useState(false);

  const { capacity, selectedTimeStart, selectedTimeEnd } = useParams();

  const loadAvailableRooms = () => {
    setShowProgressRoomList(true);
    const data = JSON.stringify({
      capacity: +capacity,
      startDatetime: selectedTimeStart,
      endDatetime: selectedTimeEnd,
    });

    const config = {
      method: "post",
      url: `${appConfig.API_URL}/squaduled/checkAvailableRoom`,
      headers: {
        Authorization: auth.token,
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
  }, [capacity]);

  useEffect(() => {
    if (availableRooms) {
      const filtered = availableRooms
        ?.map((room) => {
          const facilityIdList = room.roomFacilities?.map(
            (facility) => facility.facilityId
          );
          return { ...room, facilityIdList };
        })
        .filter((room) =>
          selectedFacilities.every((val) => room.facilityIdList.includes(val))
        );

      setAvailableRoomsFilterd(filtered);
    }
  }, [selectedFacilities, availableRooms]);

  return (
    <div className="w-full text-center">

      <ResultRoomUserRequest />
      <br />

      <ResultRoomFilterFacility
        selectedFacilities={selectedFacilities}
        setSelectedFacilities={setSelectedFacilities}
        facilities={facilities}
      />
      {showProgressRoomList ? (
        <CircularProgress color="success" />
      ) : (
        <ResultRoomLists
          availableRoomsFilterd={availableRoomsFilterd}
          setSelectedRoom={setSelectedRoom}
        />
      )}

      <div className="w-full fixed bottom-0">
        <IconButton
          onClick={() => navigate("/")}
          className="fixed float-left left-8 bottom-8 text-6xl text-[#4A7654] hover:text-[#6e9176]"
        >
          <IoArrowBackCircle />
        </IconButton>
      </div>
    </div>
  );
};

export default ResultRoom;

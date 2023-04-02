import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useParams } from "react-router-dom";
import BuildingDetail from "../components/BuildingDetail";
import * as appConfig from "../AppConfig";
import AddOrEditRoom from "../components/AddOrEditRoom";
import Swal from "sweetalert2";

const ManageRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [showLoadingRoom, setShowLoadingRoom] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState({})
  const [allFacilities, setAllFacilities] = useState([])
  const navigate = useNavigate();

  const { buildingId } = useParams();

  const resetSelectedRoom = () => {
    setSelectedRoom({
      id:0,
      name: '',
      floor:'',
      capacityMax:null,
    })
  }


  const loadRooms = () => {
    setShowLoadingRoom(true);
    const data = JSON.stringify({
      buildingId: +buildingId,
    });

    const config = {
      method: "post",
      url: `${appConfig.API_URL}/squaduled/getRoomByBuildingId`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log("Res.Data : ", response.data);
        setRooms(response.data);
      })
      .finally(() => {
        setShowLoadingRoom(false);
      });
  };

  const loadFacilities = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${appConfig.API_URL}/squaduled/getAllFacility`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setAllFacilities(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditOpen = (room) => {
    setSelectedRoom(room)
    setOpenDialog(true)
  }

  const setRoomName = (name) => {
    let roomToUpdate = {...selectedRoom,name: name}
    setSelectedRoom(roomToUpdate)
  }

  const setRoomFloor = (floor) => {
    let roomToUpdate = {...selectedRoom,floor: floor}
    setSelectedRoom(roomToUpdate)
  }

  const setRoomCapacityMax = (capacityMax) => {
    let roomToUpdate = {...selectedRoom,capacityMax: capacityMax}
    setSelectedRoom(roomToUpdate)
  }

  const handleAddOpen = () => {
    resetSelectedRoom()
      setOpenDialog(true)
  }

  const handleCancel = () => {
    resetSelectedRoom()
    setOpenDialog(false)
  }

  const handleOk = () => {
    resetSelectedRoom()
    setOpenDialog(false)
    Swal.fire("สำเร็จ!", "บันทึกเรียบร้อยแล้ว", "success").then(() => {
      loadRooms()
    });
  }

  const handleError = () => {
    setOpenDialog(false)
    Swal.fire("แย่แล้ว!", "บันทึกล้มเหลว", "error").then(() => {
    });
  }

  useEffect(() => {
    loadRooms();
    loadFacilities()
  }, []);

  return (
    <div>
      <BuildingDetail buildingId={buildingId}></BuildingDetail>
      {showLoadingRoom && <CircularProgress color="success" />}
      {rooms.map((room) => (
        <>
          <div
            key={room.id}
            className="bg-gray-200 rounded-lg mx-4 mb-1 py-4 text-gray-800  hover:text-black"
          >
            <Typography>{room.name}</Typography>

            {room.roomToFacility.map((facility) => (
              <div>
                <Typography>{facility.facility.name}</Typography>
              </div>
            ))}

            <Button onClick={() => handleEditOpen(room)}>แก้ไข</Button>
          </div>
        </>
      ))}

      <div className="w-full fixed bottom-0">
        <Button
          onClick={() => navigate("/manage-building")}
          className="fixed float-left left-8 bottom-8 px-6 py-2 rounded-lg bg-[#4A7654] hover:bg-[#6e9176] text-center text-gray-200 text-sm"
        >
          กลับ
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddOpen}
          className="fixed  float-right  right-8 bottom-8 p-4 rounded-full bg-[#618833] hover:bg-[#a2cf6e] text-center text-gray-200 text-xl"
        >
          +
        </Button>
      </div>

      <AddOrEditRoom
        openDialog={openDialog}
        selectedRoom={selectedRoom}
        setRoomName={setRoomName}
        setRoomFloor={setRoomFloor}
        setRoomCapacityMax={setRoomCapacityMax}
        handleOk={handleOk}
        handleError={handleError}
        handleCancel={handleCancel}
        buildingId={buildingId}
        allFacilities={allFacilities}
      ></AddOrEditRoom>
    </div>
  );
};

export default ManageRoom;

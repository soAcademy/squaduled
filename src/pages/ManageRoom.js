import { useState, useEffect } from "react";
import { Button, IconButton, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useParams } from "react-router-dom";
import BuildingDetail from "../components/BuildingDetail";
import { IoAddCircle, IoArrowBackCircle } from "react-icons/io5";
import * as appConfig from "../AppConfig";
import AddOrEditRoom from "../components/AddOrEditRoom";
import Swal from "sweetalert2";
import { useAuth } from "../context/auth";
import {
  BsFillPeopleFill,
  BsFillBuildingFill,
  BsCheckCircle,
} from "react-icons/bs";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ManageRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [showLoadingRoom, setShowLoadingRoom] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [allFacilities, setAllFacilities] = useState([]);
  const [expandedList, setExpandedList] = useState([]);

  const navigate = useNavigate();
  const auth = useAuth();

  const { buildingId } = useParams();

  const resetSelectedRoom = () => {
    setSelectedRoom({
      id: 0,
      name: "",
      floor: "",
      capacityMax: null,
    });
  };

  const loadRooms = () => {
    setShowLoadingRoom(true);
    const data = JSON.stringify({
      buildingId: +buildingId,
    });

    const config = {
      method: "post",
      url: `${appConfig.API_URL}/squaduled/getRoomByBuildingId`,
      headers: {
        Authorization: auth.token,
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

  const deleteRoom = (id) => {
    const data = JSON.stringify({
      id: id,
    });

    const config = {
      method: "post",
      url: "https://squaduled-api-2miz.vercel.app/squaduled/deleteRoom",
      headers: {
        Authorization: auth.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        loadRooms();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadFacilities = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${appConfig.API_URL}/squaduled/getAllFacility`,
      headers: {
        Authorization: auth.token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setAllFacilities(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id, name) => {
    Swal.fire({
      title: `ต้องการลบ ${id} ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4d9669",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRoom(id);
      }
    });
  };

  const handleExpandClick = (index) => {
    let expandedToUpdate;
    if (expandedList.includes(index)) {
      expandedToUpdate = expandedList.filter((e) => e !== index);
    } else {
      expandedToUpdate = [...expandedList, index];
    }
    setExpandedList(expandedToUpdate);
  };

  const handleEditOpen = (room) => {
    setSelectedRoom(room);
    setOpenDialog(true);
  };

  const setRoomName = (name) => {
    let roomToUpdate = { ...selectedRoom, name: name };
    setSelectedRoom(roomToUpdate);
  };

  const setRoomFloor = (floor) => {
    let roomToUpdate = { ...selectedRoom, floor: floor };
    setSelectedRoom(roomToUpdate);
  };

  const setRoomCapacityMax = (capacityMax) => {
    let roomToUpdate = { ...selectedRoom, capacityMax: capacityMax };
    setSelectedRoom(roomToUpdate);
  };

  const handleAddOpen = () => {
    resetSelectedRoom();
    setOpenDialog(true);
  };

  const handleCancel = () => {
    resetSelectedRoom();
    setOpenDialog(false);
  };

  const handleOk = () => {
    resetSelectedRoom();
    setOpenDialog(false);
    Swal.fire("สำเร็จ!", "บันทึกเรียบร้อยแล้ว", "success").then(() => {
      loadRooms();
    });
  };

  const handleError = () => {
    setOpenDialog(false);
    Swal.fire("แย่แล้ว!", "บันทึกล้มเหลว", "error").then(() => {});
  };

  useEffect(() => {
    loadRooms();
    loadFacilities();
  }, []);

  return (
    <div className="mb-32 text-center">
      <BuildingDetail buildingId={buildingId}></BuildingDetail>
      {showLoadingRoom && <CircularProgress color="success" />}
      {rooms.map((room, i) => (
        <Card
          key={room.id}
          sx={{ width: "100%", marginBottom: 1, background: "#ebebeb" }}
        >
          <CardHeader
            title={`ห้อง ${room.name}`}
            subheader={
              <div className="">
                <div>
                  <BsFillBuildingFill />
                  &nbsp;&nbsp;
                  {`${room.building.name} ชั้น ${room.floor} `}&nbsp;&nbsp;
                  <BsFillPeopleFill />
                  &nbsp;&nbsp;
                  {`${room.capacityMax}`}
                </div>
              </div>
            }
          />

            <Button
              variant="contained"
              size="small"
              aria-label="settings"
              onClick={() => {
                handleEditOpen(room);
              }}
              className="bg-gradient-to-r from-[#BC6C23] to-[#DBB482] text-white"
              sx={{m:1}}
            >
              แก้ไข
            </Button>
            <Button
              variant="contained"
              size="small"
              aria-label="settings"
              onClick={() => {
                handleDelete(room.id, room.name);
              }}
              className="bg-gradient-to-r from-[#fc4e5a] to-[#f0b1b6] text-white"
              sx={{m:1}}
            >
              ลบ
            </Button>

          <CardActions disableSpacing>
            <Typography>รายการสิ่งอำนวยความสะดวก...</Typography>
            <ExpandMore
              expand={expandedList.includes(i)}
              onClick={() => {
                handleExpandClick(i);
              }}
              aria-expanded={expandedList.includes(i)}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expandedList.includes(i)} timeout="auto" unmountOnExit>
            <CardContent>
              <div className="grid grid-cols-2 gap-1">
                {room.roomToFacility.map((facility) => (
                  <Typography align="left">
                    <BsCheckCircle color="green" />
                    &nbsp;&nbsp;{facility.facility.name}
                  </Typography>
                ))}
              </div>
            </CardContent>
          </Collapse>
        </Card>
      ))}

      <div className="w-full fixed bottom-0">
        <IconButton
          onClick={() => navigate("/manage-building")}
          className="fixed float-left left-8 bottom-8 text-6xl text-[#4A7654] hover:text-[#6e9176]"
        >
          <IoArrowBackCircle />
        </IconButton>
        <IconButton
          onClick={handleAddOpen}
          className="fixed  float-right  right-8 bottom-8 text-6xl text-[#4A7654] hover:text-[#6e9176"
        >
          <IoAddCircle />
        </IconButton>
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

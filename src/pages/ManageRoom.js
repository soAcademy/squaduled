import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "70vh",
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  button: {
    marginBottom: theme.spacing(2),
    backgroundColor: "#4A7654",
    "&:hover": {
      backgroundColor: "#6e9176",
    },
    color: "white",
    width: 360,
    height: 60,
    borderRadius: "30px",
  },
}));

const ManageRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [showLoadingRoom, setShowLoadingRoom] = useState(false);
  const [showLoadingfacility, setShowLoadingfacility] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  // +++++++++++++++ MOCKING data recieved from page manageBuilding +++++++++++++++++++++++

  const { buildingId } = useParams();
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const loadFacility = () => {
    setShowLoadingRoom(true);
    const config = {
      method: "post",
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
        setShowLoadingRoom(false);
      });
  };

  const loadRooms = () => {
    setShowLoadingRoom(true);
    const data = JSON.stringify({
      buildingId: +buildingId,
    });

    const config = {
      method: "post",
      url: "https://squaduled-api-2miz.vercel.app/squaduled/getRoomByBuildingId",
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

  useEffect(() => {
    loadFacility();
    loadRooms();
  }, []);

  return (
    <div>
      {showLoadingRoom && <CircularProgress color="success" />}
      {rooms.map((room) => (
        <>
          <div
            key={room.id}
            className="bg-gray-200 rounded-lg mx-4 mb-1 py-4 text-gray-800 cursor-pointer hover:text-black"
          >
            <h1>{room.name}</h1>

            {room.roomToFacility.map((facility) => (
              <div>
                <h2>{facility.facility.name}</h2>
              </div>
            ))}

            <button className="px-6 py-2 rounded-lg bg-[#4A7654] text-center text-gray-200 text-sm">
              แก้ไข
            </button>
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
          className="fixed  float-right  right-8 bottom-8 p-4 rounded-full bg-[#618833] hover:bg-[#a2cf6e] text-center text-gray-200 text-xl"
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default ManageRoom;

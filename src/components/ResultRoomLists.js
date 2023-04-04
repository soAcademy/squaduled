import React from "react";
import Grow from "@mui/material/Grow";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/auth";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import axios from "axios";
import * as appConfig from "../AppConfig";
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

const ResultRoomLists = ({ availableRoomsFilterd }) => {
  const auth = useAuth();
  const { selectedTimeStart, selectedTimeEnd } = useParams();
  const navigate = useNavigate();

  const [expandedList, setExpandedList] = React.useState([]);

  const handleExpandClick = (index) => {
    let expandedToUpdate;
    if (expandedList.includes(index)) {
      expandedToUpdate = expandedList.filter((e) => e !== index);
    } else {
      expandedToUpdate = [...expandedList, index];
    }
    setExpandedList(expandedToUpdate);
  };

  const handleBook = (room) => {
    Swal.fire({
      title: "ยืนยันการจอง?",

      html: `<p> ห้อง ${room.name}  <br/>วันที่ ${dayjs(
        selectedTimeStart
      ).format("DD/MM/YYYY")} <br/>
      เวลา ${dayjs(selectedTimeStart).format("HH:mm")}น. - ${dayjs(
        selectedTimeEnd
      ).format("HH:mm")}น.</p>`,
      // text: ,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4d9669",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
    }).then((result) => {
      if (result.isConfirmed) {
        createBooking(room.id);
      }
    });
  };

  const createBooking = (roomId) => {
    const data = JSON.stringify({
      startDatetime: selectedTimeStart,
      endDatetime: selectedTimeEnd,
      roomId: roomId,
      userId: auth.id,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${appConfig.API_URL}/squaduled/createBooking`,
      headers: {
        Authorization: auth.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data?.error) {
          //เพิ่มไม่สำเร็จ
          alert(response.data?.error);
        } else {
          Swal.fire("สำเร็จ", "ดำเนินการจองเรียบร้อยแล้ว!", "success").then(
            () => {
              navigate("/");
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="text-lg text-center font-bold my-2">
        <Typography>  {availableRoomsFilterd.length === 0
          ? "ไม่มีห้องว่าง"
          : `รายการห้องที่สามารถจองได้ (${availableRoomsFilterd.length})`}</Typography>

      </div>
      <div className="mb-32">
        <div className="flex flex-col items-center justify-center text-center w-full">
          {availableRoomsFilterd.map((room, i) => (
            <Grow
              in
              style={{ transformOrigin: "0 0 0" }}
              {...{ timeout: i * 300 }}
            >
              <Card
                key={room.id}
                sx={{
                  width: "90%",
                  maxWidth: "500px",
                  marginBottom: 1,
                  background: "#ebebeb",
                }}
              >
                <CardHeader
                  title={`ห้อง ${room.name}`}
                  subheader={
                    <div className="">
                      <div>
                        <BsFillBuildingFill />
                        &nbsp;&nbsp;
                        {`${room.buildingName} ชั้น ${room.floor} `}&nbsp;&nbsp;
                        <BsFillPeopleFill />
                        &nbsp;&nbsp;
                        {`${room.capacityMax}`}
                      </div>
                    </div>
                  }
                />
                <div>
                  {" "}
                  <Button
                    variant="contained"
                    size="small"
                    aria-label="settings"
                    onClick={() => {
                      handleBook(room);
                    }}
                    className="bg-gradient-to-r from-[#4A7654] to-[#8ac598] text-white"
                  >
                    จอง
                  </Button>
                </div>
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
                <Collapse
                  in={expandedList.includes(i)}
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent>
                    <div className="grid grid-cols-2 gap-1">
                      {room.roomFacilities.map((facility) => (
                        <Typography align="left">
                          <BsCheckCircle color="green" />
                          &nbsp;&nbsp;{facility.facilityName}
                        </Typography>
                      ))}
                    </div>
                  </CardContent>
                </Collapse>
              </Card>
            </Grow>
          ))}
        </div>
      </div>
    </>
  );
};

export default ResultRoomLists;

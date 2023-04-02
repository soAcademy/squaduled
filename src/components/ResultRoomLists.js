import React from "react";
import Grow from "@mui/material/Grow";
import { useNavigate } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import axios from 'axios'
import * as appConfig from '../AppConfig'

const ResultRoomLists = ({ setSelectedRoom, availableRoomsFilterd }) => {
  const { selectedTimeStart, selectedTimeEnd } = useParams();
  const navigate = useNavigate();
  //mock user id
  const userId = 2;

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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
    }).then((result) => {
      if (result.isConfirmed) {
        createBooking(room.id)
      }
    });
  };

  const createBooking = (roomId) => {
    const data = JSON.stringify({
      "startDatetime": selectedTimeStart,
      "endDatetime": selectedTimeEnd,
      "roomId": roomId,
      "userId": userId
    });
    

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${appConfig.API_URL}/squaduled/createBooking`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data?.error) {
          //เพิ่มไม่สำเร็จ
          alert(response.data?.error)
        }else{
          Swal.fire(
            'สำเร็จ',
            'ดำเนินการจองเรียบร้อยแล้ว!',
            'success'
          ).then(()=>{
            navigate('/room-searching')
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {" "}
      <div className="text-lg text-center font-bold mb-2">
        {availableRoomsFilterd.length === 0
          ? "ไม่มีห้องว่าง"
          : "รายการห้องที่สามารถจองได้"}
      </div>
      <div className="overflow-y-auto max-h-70">
        <div className="relative items-center justify-center text-center w-full overflow-hidden ">
          <TransitionGroup>
            {availableRoomsFilterd.map((room, i) => (
              <Grow in>
                <div
                  key={room.id}
                  className="flex bg-gray-200 rounded-lg mx-4 mb-1 py-4 text-gray-800 cursor-pointer hover:text-black"
                >
                  <h1 className="text-sm">{room.name}</h1>
                  <h1 className="text-sm">{room.buildingName}</h1>
                  <h1 className="text-sm">{room.floor}</h1>
                  <h1 className="text-sm">{room.capacityMax}</h1>
                  {room.roomFacilities.map((facility) => (
                    <div>
                      <h2 className="text-sm">{facility.facilityName}</h2>
                    </div>
                  ))}
                  <Button
                    onClick={() => {
                      handleBook(room);
                    }}
                    className="px-6 py-2 rounded-lg bg-[#4A7654] text-center text-gray-200 text-sm"
                  >
                    จอง
                  </Button>
                </div>
              </Grow>
            ))}
          </TransitionGroup>
        </div>
      </div>
    </>
  );
};

export default ResultRoomLists;

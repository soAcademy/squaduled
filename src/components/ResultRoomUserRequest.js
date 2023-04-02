import React from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const ResultRoomUserRequest = () => {
  const { capacity,selectedTimeStart,selectedTimeEnd } = useParams();

  return (
    <div>
      <h1 className="text-sm">คุณ ประสิทธิ วงศ์แสง รหัสพนักงาน 202308</h1>
      <h1 className="text-sm">ต้องการใช้ห้องประชุมวันที่ {dayjs(selectedTimeStart).format('DD/MM/YYYY')} </h1>
      <h1 className="text-sm">เวลา {dayjs(selectedTimeStart).format('HH:mm')}น. - {dayjs(selectedTimeEnd).format('HH:mm')} น.</h1>
      <h1 className="text-sm">จำนวนผู้เข้าประชุม {capacity} ท่าน</h1>
    </div>
  );
};

export default ResultRoomUserRequest;

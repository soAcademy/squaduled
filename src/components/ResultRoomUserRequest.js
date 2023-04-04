import React from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useAuth } from "../context/auth";

const ResultRoomUserRequest = () => {
  const auth = useAuth();
  const { capacity, selectedTimeStart, selectedTimeEnd } = useParams();

  return (
    <div>
      <h1 className="text-sm">{`คุณ ${auth.firstName} ${auth.lastName} รหัสพนักงาน ${auth.officerId}`}</h1>
      <h1 className="text-sm">
        {`วันที่ ${dayjs(selectedTimeStart).format(
          "DD/MM/YYYY"
        )}`}
      </h1>
      <h1 className="text-sm">
        {`เวลา ${dayjs(selectedTimeStart).format("HH:mm")} น. -
        ${dayjs(selectedTimeEnd).format("HH:mm")} น.`}
      </h1>
      <h1 className="text-sm">จำนวน {capacity} ท่าน</h1>
    </div>
  );
};

export default ResultRoomUserRequest;

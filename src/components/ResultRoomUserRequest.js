import React from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useAuth } from "../context/auth";
import { Typography } from "@material-ui/core";

const ResultRoomUserRequest = () => {
  const auth = useAuth();
  const { capacity, selectedTimeStart, selectedTimeEnd } = useParams();

  return (
    <div>
      <Typography>{`คุณ ${auth.firstName} ${auth.lastName} (${auth.officerId}) `}</Typography>
      <Typography>
        {" "}
        {`วันที่ ${dayjs(selectedTimeStart).format(
          "DD/MM/YYYY"
        )} จำนวน ${capacity} ท่าน`}
      </Typography>

      <Typography>
        {`เวลา ${dayjs(selectedTimeStart).format("HH:mm")} น. -
        ${dayjs(selectedTimeEnd).format("HH:mm")} น.`}
      </Typography>
    </div>
  );
};

export default ResultRoomUserRequest;

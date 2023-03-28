import React from "react";
import { useNavigate } from "react-router-dom";

const RoomBookingList = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/")}>back</button>
      
    </div>
  );
};

export default RoomBookingList;

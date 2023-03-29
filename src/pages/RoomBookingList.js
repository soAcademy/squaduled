import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from "react-router-dom";

const RoomBookingList = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>RoomBookingList</div>
      <Button
        onClick={() => navigate("/management-list")}
        className="absolute bottom-8 left-8 px-6 py-2 rounded-lg bg-[#4A7654] hover:bg-[#6e9176] text-center text-gray-200 text-sm"
      >
        กลับ
      </Button>
    </div>
  )
}

export default RoomBookingList
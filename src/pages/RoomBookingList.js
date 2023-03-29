import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

const RoomBookingList = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 500,
            height: 80,
          },
        }}
      >



          <Paper elevation={3} />
        
      </Box>
      <button onClick={() => navigate("/")}>back</button>
    </div>
  );
};

export default RoomBookingList;

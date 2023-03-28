import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/room-searching")}>RoomSearching</button>
      <button onClick={() => navigate("result-room")}>ResultRoom</button>
      <button onClick={() => navigate("/room-booking-list")}>
        RoomBookingList
      </button>
      <button onClick={() => navigate("/log-in")}>Login</button>
      <button onClick={() => navigate("/management-list")}>
        ManagementList
      </button>
      <button onClick={() => navigate("/manage-building")}>
        ManageBuilding
      </button>
      <button onClick={() => navigate("/manage-room")}>ManageRoom</button>
      <button onClick={() => navigate("/manage-facility")}>
        ManageFacility
      </button>
      <button onClick={() => navigate("/manage-office-hour")}>
        ManageOfficeHour
      </button>
      <button onClick={() => navigate("/dashboard")}>DashBoard</button>
    </div>
  );
};

export default Home;

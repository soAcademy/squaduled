import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const Home = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate('/login')
    }
  }, [auth])
  
  return (
    <div>
      <button onClick={() => navigate("/")}>RoomSearching</button>
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

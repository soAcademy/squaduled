import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ResultRoom from "./pages/ResultRoom";
import RoomBookingList from "./pages/RoomBookingList";
import RoomSearching from "./pages/RoomSearching";
import Login from "./pages/Login";
import ManagementList from "./pages/ManagementList";
import ManageBuilding from "./pages/ManageBuilding";
import ManageRoom from "./pages/ManageRoom";
import ManageFacility from "./pages/ManageFacility";
import ManageOfficeHour from "./pages/ManageOfficeHour";
import DashBoard from "./pages/DashBoard";
import Manage from "./pages/Manage";
import NavBar from "./components/NavBar";
import LoginSq from "./pages/LoginSq";
import Meetingroom from "./pages/Meetingroom";
import Daydate from "./pages/Daydate";
import ManageAll from "./pages/ManageAll";



const App = () => {
  // const Links = [
  //   { id: "UI-0", name: "Home", link: "/" },
  //   { id: "UI-1", name: "RoomSearching", link: "/room-searching" },
  //   { id: "UI-2", name: "ResultRoom", link: "/result-room" },
  //   { id: "UI-4", name: "RoomBookingList&A", link: "/room-booking-list" },
  // ];

  return (
    <>
      {/* <NavBar /> */}
      {/* <Manage /> */}
      <Meetingroom />
      <NavBar />
      {/* <ManageAll /> */}
      {/* <ManageBuilding /> */}
      {/* <Daydate /> */}
      {/* <ResultRoom /> */}
      {/* <LoginSq /> */}
      {/* <BrowserRouter>
        <div className="px-8 lg:px-32">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/room-searching" element={<RoomSearching />} />
            <Route exact path="/result-room" element={<ResultRoom />} />
            <Route
              exact
              path="/room-booking-list"
              element={<RoomBookingList />}
            />
            <Route exact path="/log-in" element={<Login />} />
            <Route exact path="/management-list" element={<ManagementList />} />
            <Route exact path="/manage-building" element={<ManageBuilding />} />
            <Route exact path="/manage-room" element={<ManageRoom />} />
            <Route exact path="/manage-facility" element={<ManageFacility />} />
            <Route
              exact
              path="/manage-office-hour"
              element={<ManageOfficeHour />}
            />
            <Route exact path="/dashboard" element={<DashBoard />} />
          </Routes>
        </div>
      </BrowserRouter> */}
    </>
  );
};

export default App;

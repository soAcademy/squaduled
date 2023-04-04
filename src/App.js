import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";
import { AuthContext } from "./context/auth";
import AuthChecker from "./components/AuthChecker";

const App = (props) => {
  const [loginDetail, setLoginDetail] = useState({
    isLoggedIn: false,
  });

  const handleLogout = () => {
    setLoginDetail({
      isLoggedIn: false,
    });
  };

  return (
    <AuthContext.Provider value={loginDetail}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <React.Fragment>
          <CssBaseline />
          <BrowserRouter>
            <NavBar handleLogout={handleLogout} />
            <Container>
              <Toolbar />
              <Box sx={{ my: 2 }}>
                <Routes>
                  <Route
                    exact
                    path="/login"
                    element={<Login setLoginDetail={setLoginDetail} />}
                  />
                  <Route exact path="/" element={<RoomSearching />} />
                  <Route
                    exact
                    path="/result-room/:capacity/:selectedTimeStart/:selectedTimeEnd"
                    element={<ResultRoom />}
                  />
                  <Route
                    exact
                    path="/room-booking-list"
                    element={<RoomBookingList />}
                  />
                  <Route
                    exact
                    path="/management-list"
                    element={<ManagementList />}
                  />
                  <Route
                    exact
                    path="/manage-building/"
                    element={<ManageBuilding />}
                  />
                  <Route
                    exact
                    path="/manage-room/:buildingId"
                    element={<ManageRoom />}
                  />
                  <Route
                    exact
                    path="/manage-facility"
                    element={<ManageFacility />}
                  />
                  <Route
                    exact
                    path="/manage-office-hour"
                    element={<ManageOfficeHour />}
                  />
                  <Route exact path="/dashboard" element={<DashBoard />} />
                  <Route exact path="/*" element={<NotFound />} />
                </Routes>
              </Box>
              <AuthChecker />
            </Container>
          </BrowserRouter>
        </React.Fragment>
      </LocalizationProvider>
    </AuthContext.Provider>
  );
};

export default App;

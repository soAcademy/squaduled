import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";

const App = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <React.Fragment>
        <CssBaseline />
        <BrowserRouter>
          <NavBar />
          <Container>
            <Toolbar />
            <Box sx={{ my: 2 }}>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                  exact
                  path="/room-searching"
                  element={<RoomSearching />}
                />
                <Route exact path="/result-room" element={<ResultRoom />} />
                <Route
                  exact
                  path="/room-booking-list"
                  element={<RoomBookingList />}
                />
                <Route exact path="/log-in" element={<Login />} />
                <Route
                  exact
                  path="/management-list"
                  element={<ManagementList />}
                />
                <Route
                  exact
                  path="/manage-building"
                  element={<ManageBuilding />}
                />
                <Route exact path="/manage-room" element={<ManageRoom />} />
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
          </Container>
        </BrowserRouter>
      </React.Fragment>
    </LocalizationProvider>
  );
};

export default App;

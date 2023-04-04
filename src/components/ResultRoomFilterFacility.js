import React from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useAuth } from "../context/auth";
import * as appConfig from "../AppConfig";

const ResultRoomFilterFacility = (props) => {
  const auth = useAuth();
  const handleSelectFacilities = (event, newFacilities) => {
    props.setSelectedFacilities(newFacilities);
  };

  const [showProgressFacilities, setShowProgressFacilities] =
    React.useState(false);
  const [facilities, setFacilities] = React.useState([]);

  React.useEffect(() => {
    loadFacility();
  }, []);

  const loadFacility = () => {
    setShowProgressFacilities(true);
    const config = {
      method: "post",
      url: `${appConfig.API_URL}/squaduled/getAllFacility`,
      headers: {
        Authorization: auth.token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setFacilities(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setShowProgressFacilities(false);
      });
  };

  return (
    <>
      {showProgressFacilities && <CircularProgress color="success" />}
      <div className="relative flex items-center justify-center w-full text-center overflow-hidden min-h-30">
        <div className="overflow-x-auto scrollbar-non min-w-30">
          <ToggleButtonGroup
            value={props.selectedFacilities}
            color="success"
            onChange={handleSelectFacilities}
            aria-label="text formatting"
          >
            {facilities.map((item) => (
              <ToggleButton
                style={{ padding: 10 }}
                value={item.id}
                aria-label="bold"
                color="success"
              >
                {item.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
      </div>
    </>
  );
};

export default ResultRoomFilterFacility;

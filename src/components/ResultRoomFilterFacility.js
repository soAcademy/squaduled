import React from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ResultRoomFilterFacility = (props) => {
  

  const handleSelectFacilities = (event, newFacilities) => {
    props.setSelectedFacilities(newFacilities);
  };

  const [showProgressFacilities, setShowProgressFacilities] =
    React.useState(false);
  const [facilities, setFacilities] = React.useState([]);
  const [selected, setSelected] = React.useState(false);

  React.useEffect(() => {
    loadFacility();
  }, []);

  const loadFacility = () => {
    setShowProgressFacilities(true);
    const config = {
      method: "post",
      url: "https://squaduled-api-2miz.vercel.app/squaduled/getAllFacility",
      headers: {},
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
    <div>
      {showProgressFacilities && <CircularProgress color="success" />}
      <ToggleButtonGroup
        value={props.selectedFacilities}
        color="success"
        onChange={handleSelectFacilities}
        aria-label="text formatting"
      >
        {facilities.map((item) => (
          <ToggleButton style={{padding:10}} value={item.id} aria-label="bold">
            {item.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

export default ResultRoomFilterFacility;

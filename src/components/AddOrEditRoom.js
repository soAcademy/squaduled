import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import axios from "axios";
import * as appConfig from "../AppConfig";
import { useAuth } from "../context/auth";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddOrEditRoom = (props) => {
  const auth = useAuth();
  const [selectedFacilityIds, setSelectedFacilityIds] = React.useState([]);
  const [isSaving, setIsSaving] = React.useState(false)
  const theme = useTheme();

  const handleChange = (event) => {
    setSelectedFacilityIds(event.target.value);
  };

  function getStyles(id, theme) {
    return {
      fontWeight:
        props.allFacilities?.map((f) => f.id).indexOf(id) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  React.useEffect(() => {
    if (props.selectedRoom) {
      const existingFacilities = props.selectedRoom?.facilities?.map(
        (fac) => fac.facilityId
      );

      if (existingFacilities) {
        setSelectedFacilityIds(existingFacilities);
      }
      return () => {
        setSelectedFacilityIds([]);
      };
    }
  }, [props.selectedRoom?.id]);

  const handleSave = () => {
    setIsSaving(true)
    const endPoint = props.selectedRoom.id === 0 ? "createRoom" : "updateRoom";
    //Save
    let data = JSON.stringify({
      id: props.selectedRoom.id,
      name: props.selectedRoom.name,
      buildingId: +props.buildingId,
      floor: props.selectedRoom.floor,
      capacity: +props.selectedRoom.capacityMax,
      facilities: selectedFacilityIds.map((facilityId) => {
        return { facilityId: facilityId };
      }),
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${appConfig.API_URL}/squaduled/${endPoint}`,
      headers: {
        Authorization: auth.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        //raise event props.handleOk
        props.handleOk();
      })
      .catch((error) => {
        console.log(error);
        props.handleError();
      })
      .finally(() => {
        setIsSaving(false)
      });
  };

  return (
    <Dialog
      open={props.openDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.selectedRoom.name
          ? `แก้ไขห้อง ${props.selectedRoom.name}`
          : "เพิ่มห้อง"}
      </DialogTitle>
      
      <DialogContent>
        <TextField
        sx={{ m: 1, width: 280 }}
          label="Name"
          name="room-name"
          value={props.selectedRoom?.name}
          onChange={(e) => props.setRoomName(e.target.value)}
        ></TextField>
        <TextField
        sx={{ m: 1, width: 280 }}
          name="floor"
          label="Floor"
          value={props.selectedRoom?.floor}
          onChange={(e) => props.setRoomFloor(e.target.value)}
        ></TextField>
        <TextField
        sx={{ m: 1, width: 280 }}
          name="capacityMax"
          label="Capacity"
          type="number"
          value={props.selectedRoom?.capacityMax}
          onChange={(e) => props.setRoomCapacityMax(e.target.value)}
        ></TextField>
        {/* //multiSelect */}
        <FormControl sx={{ m: 1, width: 280 }}>
          <InputLabel id="demo-multiple-chip-label">Facilities</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={selectedFacilityIds}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value.id}
                    label={
                      props.allFacilities?.filter((f) => f.id === value)[0]
                        ?.name
                    }
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {props.allFacilities.map((facility) => (
              <MenuItem
                key={facility.id}
                value={facility.id}
                style={getStyles(facility.id, theme)}
              >
                {facility.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.handleCancel}>Cancel</Button>
        <Button disabled={isSaving} onClick={handleSave} autoFocus>
          {isSaving ? "Saving..." : "OK"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrEditRoom;

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import Typography from "@material-ui/core/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import {
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "70vh",
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  button: {
    marginBottom: theme.spacing(2),
    backgroundColor: "#4A7654",
    "&:hover": {
      backgroundColor: "#6e9176",
    },
    color: "white",
    width: 360,
    height: 60,
    borderRadius: "30px",
  },
}));

export default function MyComponent() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [participants, setParticipants] = useState(0);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [buildings, setBuildings] = useState([]);
  const [buildingId, setBuildingId] = useState(0);

  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    setShowLoading(true);
    axios({
      method: "post",
      url: "https://squaduled-api-2miz.vercel.app/squaduled/getAllBuilding",
    })
      .then((response) => {
        console.log("Res.Data : ", response.data);
        setBuildings(response.data);
      })
      .finally(() => {
        setShowLoading(false);
      });
  }, []);
  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // Handle form submission here
  };

  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        เลือกอาคาร
      </Typography>
      {showLoading && <CircularProgress color="success" />}
      {buildings.map((building, i) => {
        return (
          <div className="flex">
            <Button
              key={building.id}
              value={building.id}
              variant="contained"
              size="large" // set size to large
              className={classes.button}
               onClick={() => navigate(`/manage-room/${building.id}`)}
            >
              {building.name}
            </Button>
          </div>
        );
      })}

      <div className="w-full fixed bottom-0">
        <Button
          onClick={() => navigate("/management-list")}
          className="fixed float-left left-8 bottom-8 px-6 py-2 rounded-lg bg-[#4A7654] hover:bg-[#6e9176] text-center text-gray-200 text-sm"
        >
          กลับ
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleOpen}
          className="fixed  float-right  right-8 bottom-8 p-4 rounded-full bg-[#618833] hover:bg-[#a2cf6e] text-center text-gray-200 text-xl"
        >
          +
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose} className="p-10">
        <DialogTitle>เพิ่มอาคาร</DialogTitle>

        <TextField
          className={classes.input}
          placeholder="ชื่ออาคาร"
          variant="outlined"
          size="small"
        />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            กลับ
          </Button>
          <Button onClick={handleSubmit} color="primary">
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import { makeStyles } from "@material-ui/core/styles";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import { Paper, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoAddCircle, IoArrowBackCircle } from "react-icons/io5";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import Grow from "@mui/material/Grow";
import axios from "axios";
import AddOrEditBuilding from "../components/AddOrEditBuilding";
import Swal from "sweetalert2";
import * as appConfig from "../AppConfig";
import { useAuth } from "../context/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  paper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    background: "#ebebeb",
  },
  label: {
    marginLeft: theme.spacing(1),
  },
  title: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

export default function MyComponent() {
  const [buildings, setBuildings] = useState([]);
  const [buildingId, setBuildingId] = useState(0);
  const [buildingName, setBuildingName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState("");

  const classes = useStyles();
  const navigate = useNavigate();
  const auth = useAuth();

  // +++++++ handle clicks +++++++
  const handleDelete = (id, name) => {
    Swal.fire({
      title: `ต้องการลบ ${name}?`,
      text: `คุณได้ลบห้องออกจาก ${name} หมดแล้ว?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4d9669",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBuilding(id);
      }
    });
  };

  const handleAddOpen = () => {
    setBuildingId(0);
    setBuildingName("");
    setOpenDialog(true);
    setTitle("เพิ่มอาคารใหม่");
  };

  const handleEditOpen = (id, name) => {
    setBuildingId(id);
    setTitle(`Edit : ${name}`);
    setBuildingName(name);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleOk = () => {
    setIsSaving(true);
    if (buildingId === 0) {
      createBuilding();
    } else {
      updateBuilding();
    }
  };

  const handleCancel = () => {
    setTitle("");
    setOpenDialog(false);
    setBuildingName("");
  };

  // +++++++ call api +++++++
  const getAllBuilding = () => {
    setShowLoading(true);
    const config = {
      method: "post",
      url: `${appConfig.API_URL}/squaduled/getAllBuilding`,
      headers: {
        Authorization: auth.token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setBuildings(response.data);
        setShowLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createBuilding = () => {
    const data = JSON.stringify({
      name: buildingName,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${appConfig.API_URL}/squaduled/createBuilding`,
      headers: {
        Authorization: auth.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        getAllBuilding();
        setOpenDialog(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const updateBuilding = () => {
    const data = JSON.stringify({
      id: buildingId,
      name: buildingName,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${appConfig.API_URL}/squaduled/updateBuilding`,
      headers: {
        Authorization: auth.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        getAllBuilding();
        setOpenDialog(false);
      })
      .catch((error) => {
        console.log(error);
      })      
      .finally(() => {
        setIsSaving(false);
      });;
  };
  const deleteBuilding = () => {
    const data = JSON.stringify({
      id: buildingId,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${appConfig.API_URL}/squaduled/deleteBuilding`,
      headers: {
        Authorization: auth.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        getAllBuilding();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllBuilding();
  }, []);

  return (
    <div>
      <Typography align="center" variant="h5" className={classes.title}>
        เลือกอาคาร
      </Typography>

      <div className="mb-32 text-center">
        {showLoading && <CircularProgress color="success" />}
        {buildings.map((building, i) => {
          return (
            <Grow
              in
              style={{ transformOrigin: "0 0 0" }}
              {...{ timeout: i * 500 }}
            >
              <Paper
                key={building.id}
                value={building.id}
                size="large" // set size to large
                className={classes.paper}
              >
                <Button
                  style={{ color: "#555" }}
                  onClick={() => navigate(`/manage-room/${building.id}`)}
                >
                  {building.name}
                </Button>
                <ButtonGroup>
                  <IconButton
                    onClick={() => handleEditOpen(building.id, building.name)}
                  >
                    <BorderColorIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(building.id, building.name)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ButtonGroup>
              </Paper>
            </Grow>
          );
        })}
      </div>

      <div className="w-full fixed bottom-0">
        <IconButton
          onClick={() => navigate("/management-list")}
          className="fixed float-left left-8 bottom-8 text-6xl text-[#4A7654] hover:text-[#6e9176]"
        >
          <IoArrowBackCircle />
        </IconButton>
        <IconButton
          onClick={handleAddOpen}
          className="fixed  float-right  right-8 bottom-8 text-6xl text-[#4A7654] hover:text-[#6e9176"
        >
          <IoAddCircle />
        </IconButton>
        <AddOrEditBuilding
          title={title}
          buildingName={buildingName}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          setBuildingName={setBuildingName}
          handleClose={handleClose}
          handleOk={handleOk}
          handleCancel={handleCancel}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
}

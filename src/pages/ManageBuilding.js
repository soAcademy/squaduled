import { makeStyles } from "@material-ui/core/styles";
import { Button, ButtonGroup } from "@mui/material";
import { Paper, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grow from "@mui/material/Grow";
import axios from "axios";
import AddOrEditBuilding from "../components/AddOrEditBuilding";
import Swal from "sweetalert2";
import * as appConfig from "../AppConfig";
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
    background: "#4A7654",
    color: "#f5f5f5",
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

  // +++++++ handle clicks +++++++
  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Confirm delete ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBuilding(id);
      }
    });
  };

  const handleAddOpen = () => {
    setBuildingId(0);
    setBuildingName("");
    // setOpenDialog(true);
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
      headers: {},
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
    setIsSaving(true);
    const data = JSON.stringify({
      name: buildingName,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${appConfig.API_URL}/squaduled/createBuilding`,
      headers: {
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
      });
  };
  const deleteBuilding = () => {
    const data = JSON.stringify({
      id: buildingId,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://squaduled-api-2miz.vercel.app/squaduled/deleteBuilding",
      headers: {
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
      <Typography variant="h5" className={classes.title}>
        เลือกอาคาร
      </Typography>

      <div className="mb-32">
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
                  className="border border-gray-100 text-gray-100"
                  onClick={() => navigate(`/manage-room/${building.id}`)}
                >
                  {building.name}
                </Button>
                <ButtonGroup>
                  <Button
                    className="border border-gray-100 text-gray-100"
                    onClick={() => handleEditOpen(building.id, building.name)}
                  >
                    แก้ไขอาคาร
                  </Button>
                  <Button
                    className="border border-gray-100 text-gray-100"
                    onClick={() => handleDelete(building.id, building.name)}
                  >
                    ลบอาคาร
                  </Button>
                </ButtonGroup>
              </Paper>
            </Grow>
          );
        })}
      </div>

      <div className="w-full fixed bottom-0">
        <Button
          onClick={() => navigate("/management-list")}
          className="fixed float-left left-8 bottom-8 px-8 py-4 rounded-full bg-[#4A7654] hover:bg-[#6e9176] text-center text-gray-200 text-sm"
        >
          กลับ
        </Button>
        <Button
          color="primary"
          onClick={handleAddOpen}
          className="fixed  float-right  right-8 bottom-8 p-4 rounded-full bg-[#4A7654] hover:bg-[#6e9176] text-center text-gray-200 text-xl"
        >
          +
        </Button>
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

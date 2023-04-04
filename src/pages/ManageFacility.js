import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { IconButton, ButtonGroup, Grow } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import AddRoEditFacility from "../components/AddRoEditFacility";
import Swal from "sweetalert2";
import * as appConfig from "../AppConfig";
import { IoAddCircle, IoArrowBackCircle } from "react-icons/io5";
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

const ManageFacility = () => {
  const [facilities, setFacilities] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [showLoadingfacility, setShowLoadingfacility] = useState(false);
  const [facilityName, setFacilityName] = useState("");
  const [title, setTitle] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  const classes = useStyles();

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
        deleteFacility(id);
        getAllFacility();
      }
    });
  };

  const handleAddOpen = () => {
    setSelectedId(0);
    setFacilityName("");
    setOpenDialog(true);
    setTitle("เพิ่มสิ่งอำนวยความสะดวก");
  };

  const handleEditOpen = (id, name) => {
    setSelectedId(id);
    setTitle(`Edit : ${name}`);
    setFacilityName(name);
    setOpenDialog(true);
  };

  const handleOk = () => {
    if (selectedId === 0) {
      createFacility();
    } else {
      updateFacility();
    }
  };

  const handleCancel = () => {
    setTitle("");
    setOpenDialog(false);
    setFacilityName("");
  };

  const deleteFacility = (id) => {
    const data = JSON.stringify({
      id: id,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${appConfig.API_URL}/squaduled/deleteFacility`,
      headers: {
        Authorization: auth.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        getAllFacility();
        setOpenDialog(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateFacility = () => {
    const data = JSON.stringify({
      id: selectedId,
      name: facilityName,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${appConfig.API_URL}/squaduled/updateFacility`,
      headers: {
        Authorization: auth.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        getAllFacility();
        setOpenDialog(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createFacility = () => {
    const data = JSON.stringify({
      name: facilityName,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${appConfig.API_URL}/squaduled/createFacility`,
      headers: {
        Authorization: auth.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        //refresh data
        getAllFacility();
        setOpenDialog(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllFacility = () => {
    setShowLoadingfacility(true);
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
        setShowLoadingfacility(false);
      });
  };

  useEffect(() => {
    getAllFacility();
  }, []);

  return (
    <div>
      <Typography align="center" variant="h5" className={classes.title}>
        รายการสิ่งอำนวยความสะดวก
      </Typography>
      <div className="mb-32 text-center">
        {showLoadingfacility && <CircularProgress color="success" />}

        {facilities?.map((item, i) => {
          return (
            <Grow
              in
              style={{ transformOrigin: "0 0 0" }}
              {...{ timeout: i * 500 }}
            >
              <Paper key={item.id} className={classes.paper}>
                <Typography variant="body1" style={{ color: "#555" }}>
                  {item.name}
                </Typography>
                <ButtonGroup>
                  {" "}
                  <IconButton
                    onClick={() => handleEditOpen(item.id, item.name)}
                  >
                    <BorderColorIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item.id, item.name)}>
                    <DeleteIcon />
                  </IconButton>
                </ButtonGroup>
              </Paper>
            </Grow>
          );
        })}

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
        </div>
        <AddRoEditFacility
          title={title}
          facilityName={facilityName}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          setFacilityName={setFacilityName}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default ManageFacility;

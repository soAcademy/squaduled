import React from "react";
import axios from "axios";
import * as appConfig from "../AppConfig";
import { useAuth } from "../context/auth";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

const BuildingDetail = (props) => {
  const classes = useStyles();
  const auth = useAuth();
  const [buildingName, setBuildingName] = React.useState("");

  React.useEffect(() => {
    const data = JSON.stringify({
      id: +props.buildingId,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${appConfig.API_URL}/squaduled/getBuildingById`,
      headers: {
        Authorization: auth.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setBuildingName(response.data?.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.buildingId]);

  return (
    <Typography align="center" variant="h6" className={classes.title}>
      จัดการห้องภายในอาคาร
      <Typography paragraph align="center" variant="h4">
        {buildingName}
      </Typography>
    </Typography>
  );
};

export default BuildingDetail;

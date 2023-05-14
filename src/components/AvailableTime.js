import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import * as appConfig from "../AppConfig";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    textAlign: "center",
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    flexBasis: "100%",
    flexShrink: 0,
  },
  content: {
    textAlign: "left",
  },
  bg: {
    backgroundColor: "#dbdbdb",
  },
}));

const AvailableTime = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const auth = useAuth();
  const [officeHourObject, setOfficeHourObject] = useState({});
  const [showLoading, setShowLoading] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setShowLoading(true);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${appConfig.API_URL}/squaduled/getAllOfficeHour2`,
      headers: {
        Authorization: auth.token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setOfficeHourObject(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setShowLoading(false);
      });
  }, []);

  const daysOfWeek = [
    { fullName: "Monday", abvName: "MON", thName: "วันจันทร์" },
    { fullName: "Tuesday", abvName: "TUE", thName: "วันอังคาร" },
    { fullName: "Wednesday", abvName: "WED", thName: "วันพุธ" },
    { fullName: "Thursday", abvName: "THU", thName: "วันพฤหัส" },
    { fullName: "Friday", abvName: "FRI", thName: "วันศุกร์" },
    { fullName: "Saturday", abvName: "SAT", thName: "วันเสาร์" },
    { fullName: "Sunday", abvName: "SUN", thName: "วันอาทิตย์" },
  ];
  return (
    <div>
      <div className={classes.root}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          className={classes.bg}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>ช่วงเวลาทำการ</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.content}>
              <div className="flex justify-center">
                {showLoading && <CircularProgress color="success" />}
              </div>
              {daysOfWeek.map((day) => {
                return (
                  <div key={day.abvName}>
                    {officeHourObject[`isOpen${day.fullName}`] ? (
                      <div className="grid grid-flow-row grid-cols-2 mx-10">
                        <span>{day.thName} : </span>
                        <span>
                          {officeHourObject[
                            `openingTime${day.fullName}`
                          ].substring(0, 5)}{" "} น.
                          -{" "}
                          {officeHourObject[
                            `closingTime${day.fullName}`
                          ].substring(0, 5)}{" "}
                          น.
                        </span>
                      </div>
                    ) : (
                      <div className="grid grid-flow-row grid-cols-2 mx-10">
                        <span>{day.thName} : </span>
                        <span> ปิดทำการ </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default AvailableTime;

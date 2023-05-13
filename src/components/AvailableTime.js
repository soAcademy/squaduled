import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import * as appConfig from "../AppConfig";

const AvailableTime = () => {
  const auth = useAuth();
  const [officeHourObject, setOfficeHourObject] = useState({});
  const [showLoading, setShowLoading] = useState(false);

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
    { fullName: "Monday", abvName: "MON" },
    { fullName: "Tuesday", abvName: "TUE" },
    { fullName: "Wednesday", abvName: "WED" },
    { fullName: "Thursday", abvName: "THU" },
    { fullName: "Friday", abvName: "FRI" },
    { fullName: "Saturday", abvName: "SAT" },
    { fullName: "Sunday", abvName: "SUN" },
  ];
  return (
    <div className="justify-center">
      <div>{showLoading && <CircularProgress />}</div>
      <p className="text-lg font-bold">
        Please select time within our available time
      </p>
      <div>
        {daysOfWeek.map((day) => {
          return (
            <div key={day.abvName} className="items-center">
              {officeHourObject[`isOpen${day.fullName}`] ? (
                <p>
                  {day.fullName} : open{" "}
                  {officeHourObject[`openingTime${day.fullName}`].substring(
                    0,
                    5
                  )}{" "}
                  -{" "}
                  {officeHourObject[`closingTime${day.fullName}`].substring(
                    0,
                    5
                  )}{" "}
                  o'clock
                </p>
              ) : (
                <p>{day.fullName} : Not Available</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailableTime;

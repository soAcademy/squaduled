import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from "axios";
import * as appConfig from "../AppConfig";
import CircularProgress from "@mui/material/CircularProgress";
import swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1),
    background: "#fff",
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[5],
    maxWidth: "300px",
    width: "80%",
  },
  input: {
    marginBottom: theme.spacing(2),
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = (event) => {
    setShowLoading(true);
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);

    const data = JSON.stringify({
      userName: username,
      password: password,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${appConfig.API_URL}/squaduled/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        let loginDetail = { ...response.data, isLoggedIn: true }
        props.handleLogin(loginDetail);
      })
      .catch((error) => {
        swal
          .fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.error,
          })
          .then(() => {
          })
          .finally(() => {
            setShowLoading(false);
          });
      });
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/");
    }
  }, [auth]);

  return (
    <Box className={classes.box} Container>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom className="pt-5">
          ยินดีต้อนรับ
        </Typography>
        <Typography variant="h7" gutterBottom className="pd-10">
          เข้าสู่ระบบ Squaduled
        </Typography>
        <TextField
          className={classes.input}
          label="Username"
          variant="outlined"
          size="small"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          className={classes.input}
          label="Password"
          type="password"
          variant="outlined"
          size="small"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {showLoading ? (
          <CircularProgress color="success" />
        ) : (
          <Button
            className="px-6 mb-6 bg-gradient-to-r from-[#4A7654] to-[#8ac598] text-white"
            variant="contained"
            color="primary"
            type="submit"
          >
            Login
          </Button>
        )}
      </form>
    </Box>
  );
};

export default Login;

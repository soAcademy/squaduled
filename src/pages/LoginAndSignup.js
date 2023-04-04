import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  TextField,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from "axios";
import * as appConfig from "../AppConfig";
import swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1),
    // backgroundColor: theme.palette.background.paper,
    background:"#ebebeb",
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[5],
    maxWidth: "400px",
    width: "80%",
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "50%",
    backgroundColor: "#4A7654",
    "&:hover": {
      backgroundColor: "#6e9176",
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);

    let data = JSON.stringify({
      userName: username,
      password: password,
    });

    let config = {
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
        props.setLoginDetail({ ...response.data, isLoggedIn: true });
      })
      .catch((error) => {
        swal
          .fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.error,
          })
          .then(() => {
            props.setLoginDetail({ error, isLoggedIn: false });
          });
      });
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/");
    }
  }, [auth]);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <Container className={classes.container}Container>
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
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>
        {/* <Typography variant="body2" gutterBottom>
          <Link href="#" onClick={handleOpen}>
            Forgot password?
          </Link>
        </Typography>
        <Typography variant="body2" gutterBottom>
          Don't have an account?{" "}
          <Link href="#" onClick={handleOpen}>
            Sign up
          </Link>
        </Typography> */}
      </form>
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Apply for Membership</DialogTitle>
        <DialogContent>
          <Typography>
            To apply for membership, please fill out the application form.
          </Typography>
          Add your membership application form here
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog> */}
    </Container>
  );
};

export default Login;

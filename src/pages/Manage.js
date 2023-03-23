import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
  },
  textField: {
    margin: theme.spacing(1),
    width: '25ch',
  },
  button: {
    margin: theme.spacing(2),
  },
}));

function LoginForm() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your login logic here
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        className={classes.textField}
        value={email}
        onChange={handleEmailChange}
        required
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        className={classes.textField}
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Login
      </Button>
      <Link href="#">Forgot Password?</Link>
      <Typography>
        Don't have an account? <Link href="#">Sign Up</Link>
      </Typography>
    </form>
  );
}

export default LoginForm;

import React from 'react';

import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';


import {MainLoader} from "./loaders/MainLoader"

import Copyright from './Copyright';

const useStyles = makeStyles(theme => ({
  root: {
    height: '90vh',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({onSigninSubmit, email, onEmailChange, password, onPasswordChahge, loading }) => {
  const classes = useStyles();

  const [showPass, setShow] = React.useState(false);

  const HandleShowPassord = () => {
      setShow(!showPass)
  }

  if (loading) return (
       <MainLoader/>
  )

  return (
    <Grid container className={classes.root} maxWidth="md">
      <CssBaseline />
      
      <Grid component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ЭКРАН ОНЛАЙН
          </Typography>
          <form className={classes.form} onSubmit={onSigninSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Логин"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={onEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type={showPass? "text" : "password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={HandleShowPassord}> 
                        {showPass ? <Visibility/> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
                ),
            }}
              value={password}
              onChange={onPasswordChahge}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Войти
            </Button> 
              
              <Button>Забыли пароль?</Button>
           
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;
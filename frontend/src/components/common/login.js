import React from 'react';
import { useState } from "react";
import axios from "axios";
import { Grid, Paper, Typography, Button, TextField, Avatar, Link } from '@material-ui/core';
import LoginIcon from '@mui/icons-material/Login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, orange } from '@mui/material/colors';
import { Navigate, useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';

const redTheme = createTheme({ palette: { primary: red } })
const oTheme = createTheme({ palette: { primary: orange } })

// User is the User
// Badmin is the Admin

const Login=()=> {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const HandleEChange = (event) => { 
        setEmail(event.target.value);
    };

    const HandlePChange = (event) => {
        setPassword(event.target.value);
    };

    const sign_in_s = {
        padding: '5vh 5vw',
        height: '70vh',
        width: '25vw',
        margin: "15vw auto"
    }
    const icon_style= {
        backgroundColor: 'orange'
    }
    const btnstyle={
        margin: '5% auto',
        backgroundColor: '#FFA500',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#FFA500',
          color: '#fff',
        },
    }
    const sign_up_s={
        margin: '10% auto'
    }
    const img_s={
        margin: '10% auto',
        borderRadius: '5%'
    }

    const HandleClick = () => {
        Navigate('/whoareyou');
    }
    
  const resetInputs = () => {
    setEmail("");
    setPassword("");
  };

  // const onSubmit = (event) => {
  //   event.preventDefault();

  //   const newLogin = {
  //     email: email,
  //     password: password,
  //   };

  //   // console.log(newLogin);
  //   // console.log(email);
  //   // console.log(password);

  //   axios
  //     .post("http://localhost:4000/misc/login", newLogin)
  //     .then((response) => {
  //      console.log("Login Successful");
  //      localStorage.setItem("IsUser", response.data[0]);
  //      localStorage.setItem("Email", email);
      
  //      console.log("Hello\t" + localStorage.getItem("Email"));
  //      console.log("IsUser\t" + localStorage.getItem("IsUser"));

  //      console.log(response.data);
       
  //      if( response.data[0] === 1)
  //      {
  //         navigate('/user');
  //      }
  //      else if( response.data[0] === 0)
  //      {
  //         navigate('/badmin');
  //      }
  //      else
  //      {
  //        alert("Invalid option selected");
  //      }
  //     })
  //     .catch ((err) => {
  //       alert(err);
  //     });

  //   resetInputs();
  // };
  const onSubmit = (event) => {
    event.preventDefault();

    const details = {
        email: email,
        password: password
    };

    let user = true;
    let badmin_user = true; 
    console.log(user );
  axios
  .post("http://localhost:4000/misc/blogin", details)       
  .then((response) => {

    console.log(response.data.status);
    console.log(response.status);
    if (response.data.status === "success") {
      console.log(response.data);
      localStorage.clear();
      localStorage.setItem("Email", response.data.users.email);
      localStorage.setItem("IsUser", 1);
      //gotouser
      navigate("/user");
    /* }*/
    }
    if(response.data.status === "User not found")
    {
      axios
    .post("http://localhost:4000/misc/vlogin", details)
    .then((response2) => {
      if(response2.data.status === "Badmin not found") {
        alert("Wrong Credentials");
        }
      else{
      console.log(response2.data);
      localStorage.clear();
      localStorage.setItem("Email", response2.data.user.email);
      localStorage.setItem("IsUser", 0);

      //gotobadmin
      navigate("/badmin");
      badmin_user = false;
      }
      });
    }
  });
};

  // resetInputs();

    return (
        <Grid align='center' >
            <Paper elevation={10} style={sign_in_s}>
                
                <Grid align = 'center' margin='1vh'>
                    <Avatar style={icon_style} ><LoginIcon /></Avatar>
                    <h1>Hello, Sign In</h1>
                </Grid>
                
                <TextField label='Email'    onChange={HandleEChange} placeholder='Enter your email' required fullWidth/>
                <TextField label='password' onChange={HandlePChange} placeholder='Enter password' type='password' required fullWidth/>
                
                {/* <ThemeProvider theme={redTheme}> */}
                <Button type='submit' variant="outlined" color="primary" onClick={onSubmit} style={btnstyle}>Sign In</Button>
                {/* </ThemeProvider> */}

                <Typography variant='caption' style={sign_up_s} align='center' fullwidth="true"> <br /> <b>New to Academia?  &ensp; </b>
                    <Link href="/whoareyou" onClick={HandleClick} > Sign up</Link>
                </Typography>
                <br />
                <img src={logo} style={img_s} alt="logo" width='60%' height='40%' />
            </Paper>
        </Grid>        
    )
}

export default Login;
    
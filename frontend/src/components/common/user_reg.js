import { useState } from "react";
import axios from "axios";
import { Grid, Paper, Avatar } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate  } from "react-router-dom";

const Buy_reg = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ContactNo, setContactNo] = useState(0);
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(0);
  const [CPass, setCPass] = useState("");
  const [OrgName, setOrgName] = useState("");

  const navigate = useNavigate();

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeContactNo = (event) => {
    setContactNo(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  
  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const onChangeOrgName = (event) => {
    setOrgName(event.target.value);
  };
  const resetInputs = () => {
    setName("");
    setEmail("");
    setContactNo(0);
    setPassword("");
    setAge(0);
    setOrgName("");
  };

  const onChangeCPass = (event) => {
    setCPass(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      OrgName: OrgName,
      ContactNo: ContactNo,
      password: password,
      age: age
    };

    console.log(newUser);
  
    if( password !== CPass ){
      alert("Password does not match");
      window.location.reload();
    }

    axios
      .post("http://localhost:4000/user/bregister", newUser)
      .then((response) => {
        console.log(response.data);

        // goto login page
        navigate("/");
      })
      .catch ((err) => {
        alert(err);
      });

    resetInputs();
  };

  const paper_s = { padding: "5vh 1vw", width: "30%", margin: "5vh auto" };
  const textStyle = { margin: "1vh 0" };

  return (
    <Grid align={"center"}>
      <Paper elevation={20} style={paper_s}>
        <Grid align={"center"}>
          <Avatar color="success" style={{backgroundColor: '#1bbd7e'}}>
            <VpnKeyIcon />
          </Avatar>
          <h1>Register</h1>
          <Typography variant="caption" style={{font_size:28}}>Welcome!</Typography>
        </Grid>
        <form style={{'margin': '10px', padding: '10px'}} onSubmit={onSubmit}>
          <TextField style={textStyle} onChange={onChangeUsername}  fullWidth label='Name' placeholder="Enter your username" />
          <TextField style={textStyle} onChange={onChangeOrgName}  fullWidth label='Organization Name' placeholder="Enter Organization" />
          <TextField style={textStyle} onChange={onChangeEmail}     fullWidth label='Email' placeholder="Enter your Email" />
          <TextField style={textStyle} onChange={onChangeContactNo} fullWidth label='Contact' placeholder="Enter your Contact" />
          <TextField style={textStyle} onChange={onChangePassword}  fullWidth label='Password' placeholder="Enter your Password" type="password" />
          <TextField style={textStyle} onChange={onChangeAge}  fullWidth label='Age' placeholder="Enter your Age" />
          <TextField style={textStyle} onChange={onChangeCPass}     fullWidth label='Confirm Password' placeholder="Confirm the top-secret Password" type="password" />

          <Button style={{margin: '15px'}} type="submit" variant="contained" color="success">Sign me up!</Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Buy_reg;

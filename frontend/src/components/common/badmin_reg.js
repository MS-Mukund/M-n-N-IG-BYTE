import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Grid, Paper, Avatar } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { MenuItem, Typography, FormControl, Select, InputLabel } from "@mui/material";
// import DateTimePicker from '@mui/lab/DateTimePicker';

const Badmin_reg = (props) => {
  const navigate = useNavigate();
  const [AdminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [ContactNo, setContactNo] = useState('');
  const [password, setPassword] = useState("");
  const [CPass, setCPass] = useState("");
  const [CompanyID, setCompanyID] = useState("");
  const [CompanyPass, setCompanyPass] = useState("");

  const onChangeName = (event) => {
    setAdminName(event.target.value);
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

  const ConfirmPassword = (event) => {
    setCPass(event.target.value);
  };

  const onChangeCompanyID = (event) => {
    setCompanyID(event.target.value);
  };

  const onChangeCompanyPass = (event) => {
    setCompanyPass(event.target.value);
  };

  const resetInputs = () => {
    setAdminName("");
    setEmail("");
    setContactNo(0);
    setPassword("");
    setCompanyID("");
    setCompanyPass("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    //error handling
    if( password !== CPass ){
      console.log(password);
      console.log(CPass);
      alert("Password does not match");
      Location.reload();
    }

    console.log(AdminName);
    console.log(email);
    console.log(ContactNo);
    console.log(password);
    console.log(CompanyID);
    console.log(CompanyPass);
    console.log("here");

    const newBadmin = {
      AdminName: AdminName,
      email: email,
      ContactNo: ContactNo,
      password: password,
      CompanyID: CompanyID,
      CompanyPass: CompanyPass
    };

    axios
      .post("http://localhost:4000/badmin/vregister", newBadmin)
      .then((response) => {
        navigate("/");
      })
      .catch ((err) => {
        alert(err);
        Location.reload();
      });

    resetInputs();
  };

  const paper_s = { padding: "5vh 1vw", width: "35%", margin: "5vh auto" };
  const textStyle = { margin: "1vh 0" };

  return (
    <Grid align={"center"}>
      <Paper elevation={20} style={paper_s}>
        <Grid align={"center"}>
          <Avatar color="success" style={{backgroundColor: '#1bbd7e'}}>
            <VpnKeyIcon />
          </Avatar>
          <h1>Register</h1>
          <Typography variant="caption" style={{font_size:16}}>Enter company id and company passcode to confirm you're an admin</Typography>
        </Grid>
        <form style={{'margin': '10px', padding: '10px'}} onSubmit={onSubmit}>
          <TextField style={textStyle} fullWidth label='Name' placeholder="Enter your name" onChange={onChangeName} required />
          <TextField style={textStyle} fullWidth label='Email' placeholder="Enter your Email" onChange={onChangeEmail} required/>
          <TextField style={textStyle} fullWidth label='Contact' placeholder="Your mobile number" onChange={onChangeContactNo} required/>
          <TextField style={textStyle} fullWidth label='Password' placeholder="Enter your Password" type="password" onChange={onChangePassword} required/>
          <TextField style={textStyle} fullWidth label='Confirm Password' placeholder="Confirm Pasword" type="password" onChange={ConfirmPassword} required />
          <TextField style={textStyle} fullWidth label='Company ID' placeholder="Enter your company ID" onChange={onChangeCompanyID} required />
          <TextField style={textStyle} fullWidth label='Company Passcode' placeholder="Enter your company passcode" onChange={onChangeCompanyPass} required />

          <br />
          <Button style={{margin: '15px'}} type="submit" variant="contained" color="success">Submit</Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Badmin_reg;

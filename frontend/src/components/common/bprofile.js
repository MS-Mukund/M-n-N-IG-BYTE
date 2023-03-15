import { useEffect, useState } from "react";
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
import DeleteIcon from '@mui/icons-material/Delete';

const Buy_prof = (props) => {
  const [name, setName] = useState("");
  const [OrgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [ContactNo, setContactNo] = useState(0);
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(0);

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

  useEffect(() => {
    axios
    .get("http://localhost:4000/user/bprofile/" + localStorage.getItem("Email") )
    .then((response) => {
          console.log(response.data);
          setName(response.data.name);
          setOrgName(response.data.OrgName);
          setEmail(response.data.email);
          setContactNo(Number(response.data.ContactNo) );
          setPassword(response.data.password);
          setAge( Number(response.data.Age) );
          
    })
    .catch((error) => {
      alert(error);
      console.log( localStorage.getItem("Email"));
      console.log(error);
    });
}, [] );

  const resetInputs = () => {
    setName("");
    setOrgName("");
    setEmail("");
    setContactNo(0);
    setPassword("");
    setAge(0);
  };

  const onDelete = (event) => {
    event.preventDefault();

    axios
    .delete( ("http://localhost:4000/user/delete/" + email) )
    .then((response) => {
      console.log(response.data);

      localStorage.removeItem("IsUser");
      localStorage.removeItem("Email");
      // goto login page
      navigate("/");
    })
    .catch ((err) => {
      alert(err);
    });

    resetInputs();
  }

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      ContactNo: ContactNo,
      password: password,
      Age: age,
      OrgName: OrgName, 
    };

    console.log(newUser);
  
    axios
      .put("http://localhost:4000/user/editbpr", newUser)
      .then((response) => {
        console.log(response.data);

        // goto login page
        alert("Profile Updated Successfully");
        navigate("/user");
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
          <Avatar color="success" style={{backgroundColor: '#EE4B2B'}}>
            <DeleteIcon onClick={onDelete} />
          </Avatar>
          <h1>Register</h1>
          <Typography variant="caption" style={{font_size:32}}>Welcome!</Typography>
        </Grid>
        <form style={{'margin': '10px', padding: '10px'}} onSubmit={onSubmit}>
          <TextField style={textStyle} value={name} onChange={onChangeUsername} disabled fullWidth label='Name' placeholder="Name" />
          <TextField style={textStyle} value={OrgName} onChange={onChangeOrgName}   fullWidth label='Organization' placeholder="Your organization" />
          <TextField style={textStyle} value={email} onChange={onChangeEmail} disabled  fullWidth label='Email' placeholder="Your Email" />
          <TextField style={textStyle} value={ContactNo} onChange={onChangeContactNo} fullWidth label='Contact' placeholder="Enter your Contact" />
          <TextField style={textStyle} value={password} onChange={onChangePassword}  fullWidth label='Password' placeholder="Enter your Password" type="password" />
          <TextField style={textStyle} value={age} onChange={onChangeAge}       fullWidth label='Age' placeholder="how old are you" />

          <Button style={{margin: '15px'}} type="submit" variant="contained" color="success">Update</Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Buy_prof;

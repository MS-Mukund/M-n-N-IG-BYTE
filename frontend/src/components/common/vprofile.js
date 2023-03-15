import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Grid, Paper, Avatar } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EditOffIcon from '@mui/icons-material/EditOff';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { MenuItem, Typography, FormControl, Select, InputLabel } from "@mui/material";
// import DateTimePicker from '@mui/lab/DateTimePicker';

const Badmin_Prof = (props) => {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ContactNo, setContactNo] = useState('');

  const [password, setPassword] = useState("");
  const [id, setID ] = useState("");
  const [CID, setCID] = useState("");
  const [ComPass, setComPass] = useState("");

  // Note: CID and ComPass are READ ONLY

  useEffect(() => {
    axios
      .get("http://localhost:4000/badmin/vprofile/" + localStorage.getItem("Email") )
      .then((response) => {
            console.log(response.data);

            setID(response.data._id);
            setName(response.data.Name);
            setEmail(response.data.email);
            setContactNo(response.data.ContactNo);
            setPassword(response.data.password);
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  }, [] );

  const onChangeName = (event) => {
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

  let mins_arr = Array.from(Array(60).keys());
  let hrs_arr = Array.from(Array(24).keys());

  const resetInputs = () => {
    setName("");
    setEmail("");
    setContactNo(0);
    setPassword("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    console.log(Name);
    console.log(email);
    console.log(ContactNo);
    console.log(password);
    console.log(CID);
    console.log(ComPass);

    const newBadmin = {
      Name: Name,
      email: email,
      ContactNo: ContactNo,
      password: password,
      CompanyID: CID, 
      CompanyPass: ComPass
    };
    

    axios
      .put( ("http://localhost:4000/badmin/editvpr") , newBadmin)
      .then((response) => {
        console.log(response.data);

        // goto login page
        navigate("/badmin");
      })
      .catch ((err) => {
        alert(err);
      });

    resetInputs();
  };

  const onDelete = (event) => {
    event.preventDefault();

    axios
    .delete( ("http://localhost:4000/badmin/delete/" + email) )
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

  };

  const paper_s = { padding: "5vh 1vw", width: "35%", margin: "5vh auto" };
  const textStyle = { margin: "1vh 0" };

  return (
    <Grid align={"center"}>
      <Paper elevation={20} style={paper_s}>
        <Grid align={"center"}>
          <Avatar color="error" style={{backgroundColor: '#EE4B2B'}}>
            <DeleteIcon onClick={onDelete} />
          </Avatar>
          <h1>Your Profile</h1>
        </Grid>
        <form style={{'margin': '10px', padding: '10px'}} onSubmit={onSubmit}>
          <TextField style={textStyle} value={Name} fullWidth label=' Name' placeholder="Who's the boss" onChange={onChangeName} required />
          <TextField style={textStyle} value={email} disabled fullWidth label='Email' placeholder="Enter your Email" onChange={onChangeEmail} required/>
          <TextField style={textStyle} value={ContactNo} fullWidth label='Contact' placeholder="Enter your mobile no." onChange={onChangeContactNo} required/>
          <TextField style={textStyle} value={password} fullWidth label='Password' placeholder="Enter Password" type="password" onChange={onChangePassword} required/>
          <TextField style={textStyle} value={CID} disabled fullWidth label='Company ID' placeholder="Enter your Company ID" type="password"/>
          <TextField style={textStyle} value={ComPass} disabled fullWidth label='Company Password' placeholder="Enter your Company Password" type="password"/>

          <br />
          <Button style={{margin: '15px'}} type="submit" variant="contained" color="warning">Update My Profile</Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Badmin_Prof;

import React from 'react';
import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid, Paper } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const WhoAreYou = () => {
    const navigate = useNavigate();
    const [UserType, setUserType ] = useState('');
    const HandleChange = (event) => { 

        if( event.target.value === 1 )
        {
            navigate('/User_r');
        }
        else
        {
            navigate('/Badmin_r');
        }
  }
    return (
    <Grid align={"center"}>
        <FormControl style={{width:"25%", margin: "15vh"}} >
        <InputLabel style={{width: "50%"}} id="demo-simple-select-label">Select type of user</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={UserType} onChange={HandleChange}>
          <MenuItem value={1}>I am a User</MenuItem>
          <MenuItem value={0}>I am an Admin</MenuItem>
        </Select>
        </FormControl>
    </Grid>
    );
};

export default WhoAreYou;
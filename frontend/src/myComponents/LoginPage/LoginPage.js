import { Box, Chip, Container , Divider , Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import './LoginPage.css'
import { ChakraProvider } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';

const LoginPage = () => {

  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      history.push("/chats");
    }
  }, [history]);
  


  return (
    <div className="wrapper">
      
        <Grid className="login_box" container spacing={1}>
          <Grid item xs={5}>
            <Box>
              <Login />
            </Box>
          </Grid>
          <Divider orientation="vertical" flexItem>
            <Chip label="OR" />
          </Divider>
      
          <Grid item xs={5}>
            <Box>
              <Signup />
            </Box>
          </Grid>
          
        </Grid>
      
    </div>
  );
}

export default LoginPage
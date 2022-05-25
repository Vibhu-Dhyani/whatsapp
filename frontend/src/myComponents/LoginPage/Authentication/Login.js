import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [loading, setloading] = useState(false);
  const history = useHistory();

  




  const submitHandler = async () => {
    setloading(true);
    if (!email || !password) {
      alert("Please fill all fields");
      setloading(false);
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      // console.log(JSON.stringify(data));
      alert("Login Successfull");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setloading(false);
      history.push("/chats");
    } catch (error) {
      alert("Error Occured");
      setloading(false);
    }
  };

  return (
    <>
      <Box className="title" textAlign="center" color="#59546C">
        <h1>Log In</h1>
      </Box>
      <Stack spacing={5}>
        <FormControl id="email">
          <TextField
            id="email"
            label="Email"
            variant="standard"
            onChange={(e) => setemail(e.target.value)}
            required={true}
            value={email}
          />
        </FormControl>

        <FormControl id="password">
          <TextField
            id="password"
            label="Password"
            variant="standard"
            type="password"
            onChange={(e) => setpassword(e.target.value)}
            required={true}
            value={password}
          />
        </FormControl>

        <FormControl>
          <LoadingButton
            loading={loading}
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
          >
            Log In
          </LoadingButton>
        </FormControl>

        <FormControl>
          <LoadingButton
            loading={loading}
            width="100%"
            style={{ marginTop: -30 }}
            onClick={() => {
              setemail("guest@example.com");
              setpassword("12345678");
            }}
          >
            <div style={{ color: "#59546C" }}>Log In As Guest</div>
          </LoadingButton>
        </FormControl>
      </Stack>
    </>
  );
};

export default Login;

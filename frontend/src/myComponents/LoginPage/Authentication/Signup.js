import {
  FormControl,
  FormLabel,
  Hidden,
  Input,
  Button,
  Stack,
  TextField,
  bottomNavigationActionClasses,
  AlertTitle,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  const [pic, setimage] = useState();
  const [show, setshow] = useState(false);
  const [loading, setloading] = useState(false);

  const toast = useToast();
  const history = useHistory();

  const postDetails = (pics) => {
    setloading(true);
    if (pics === undefined) {
      alert("Please Select a Pic");
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "whatsappclone");
      data.append("cloud_name", "dlssbq8b5");
      fetch("https://api.cloudinary.com/v1_1/dlssbq8b5/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setimage(data.url.toString());
          console.log(data.url.toString());
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    } else {
      alert("Error While Loading the Image");
      setloading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setloading(true);
    if (!name || !email || !password || !confirmpassword) {
      alert("Please fill all the mandatory fields");
      setloading(false);
      return;
    }
    if (password != confirmpassword) {
      alert("Passwords Do Not Match");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );

      alert("Registration Successfull");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setloading(false);
      history.push("/chats");
    } catch (error) {
      alert(error);
      setloading(false);
    }
  };

  return (
    <>
      <Box className="title" textAlign="center" color="#59546C">
        <h1>Sign Up</h1>
      </Box>
      <Stack spacing={5}>
        <FormControl id="name">
          <TextField
            id="name"
            label="Name"
            variant="standard"
            onChange={(e) => setname(e.target.value)}
            required={true}
          />
        </FormControl>

        <FormControl id="email">
          <TextField
            id="email"
            label="Email"
            variant="standard"
            onChange={(e) => setemail(e.target.value)}
            required={true}
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
          />
        </FormControl>

        <FormControl id="confirm-password">
          <TextField
            id="confirm-password"
            label="Confirm Password"
            variant="standard"
            type="text"
            onChange={(e) => setconfirmpassword(e.target.value)}
            required={true}
          />
        </FormControl>

        <FormControl>
          <Button>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            />
            <span style={{ color: "grey", fontSize: "9px" }}>Upload Photo</span>
          </Button>
        </FormControl>

        <FormControl>
          <LoadingButton
            loading={loading}
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
          >
            Sign Up
          </LoadingButton>
        </FormControl>
      </Stack>
    </>
  );
};

export default Signup;

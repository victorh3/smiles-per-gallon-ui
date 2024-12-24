import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const Home: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignOn = () => {
    // Handle sign-on logic here
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Smiles Per Gallon
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSignOn}
      >
        Sign On
      </Button>
    </>
  );
};

export default Home;

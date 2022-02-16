import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import TagIcon from '@mui/icons-material/Tag';

const App: React.FC = () => {
  let navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value.toLowerCase());
  }

  const onJoinButtonClick = () => {
    navigate(`/${roomName}`);
  };

  return (
    <Container sx={{ height: '100%' }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
      >
        <Stack spacing={2} justifyContent={'center'}>
          <Typography variant="h5" gutterBottom component="div">
            Welcome to Ploker
          </Typography>
          <TextField
            placeholder="Enter room name here"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TagIcon />
                </InputAdornment>
              ),
            }}
            onChange={onChange}
          />
          <Button variant="contained" onClick={onJoinButtonClick}>Join</Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default App;

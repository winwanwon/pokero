import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, InputAdornment, Link, Stack, TextField, Typography } from "@mui/material";
import TagIcon from '@mui/icons-material/Tag';

const App: React.FC = () => {
  let navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match("^[a-zA-Z0-9]*$") != null) {
      setRoomName(e.target.value.toLowerCase());
    }
  }

  const onJoinButtonClick = () => {
    navigate(`/${roomName}`);
  };

  return (
    <>
      <Container sx={{ height: '100%' }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          <Stack spacing={2} justifyContent="center" textAlign="center">
            <Box marginBottom={2}>
              <img src="/pokero-logo.png" alt="POKERO" width="320" />
            </Box>
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
              value={roomName}
            />
            <Button variant="contained" disabled={!roomName} onClick={onJoinButtonClick}>Join</Button>
          </Stack>
        </Box>
      </Container>
      <Box
        position="absolute"
        bottom={10}
        width="100%"
        display="flex"
        justifyContent="center"
        color="gray"
      >
        <Typography variant="caption">
          developed by Warat Kaweepornpoj, <Link href="https://github.com/winwanwon/pokero" target="_blank" rel="noreferrer">Github</Link> contributions are welcome!
        </Typography>
      </Box>
    </>
  );
}

export default App;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, InputAdornment, Link, Stack, TextField, Typography } from "@mui/material";
import TagIcon from '@mui/icons-material/Tag';
import { isValidRoomName } from "./utils";

const App: React.FC = () => {
  let navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isValidRoomName(e.target.value) && setRoomName(e.target.value.toLowerCase());
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onJoinButtonClick();
    }
  };

  const onJoinButtonClick = () => {
    roomName && navigate(`/${roomName}`);
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
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            minHeight="400px"
            maxWidth="600px"
            maxHeight="400px"
            className="card"
          >
            <Stack spacing={2} justifyContent="center" textAlign="center" padding={3}>
              <Box marginBottom={2}>
                <img src="/pokero-logo.png" alt="POKERO" className="responsive" />
              </Box>
              <TextField
                placeholder="Enter room name here"
                variant="outlined"
                color="primary"
                autoFocus={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TagIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={onChange}
                onKeyPress={onKeyPress}
                value={roomName}
              />
              <Button variant="contained" disabled={!roomName} onClick={onJoinButtonClick}>
                Join {roomName && `#${roomName}`}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
      <Box
        position="absolute"
        bottom={10}
        px={2}
        width="100%"
        display="flex"
        justifyContent="center"
        color="gray"
      >
        <Typography variant="caption" sx={{ 'wordWrap': 'normal' }}>
          developed by Warat Kaweepornpoj, <Link href="https://github.com/winwanwon/pokero" target="_blank" rel="noreferrer">Github</Link> contributions are welcome!
        </Typography>
      </Box>
    </>
  );
}

export default App;

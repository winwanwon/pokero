import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, CssBaseline, InputAdornment, Stack, TextField, Typography, Grid } from "@mui/material";
import TagIcon from '@mui/icons-material/Tag';
import PeopleIcon from '@mui/icons-material/People';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { isValidRoomName } from "./utils";
import { FeatureBox } from "./components/FeatureBox";
import { NavBar } from "./components/NavBar";
import { ReactComponent as PokeroIllus } from "./svg/pokero-illus.svg"

const App: React.FC = () => {
  let navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isValidRoomName(e.target.value) && setRoomName(e.target.value.toLowerCase());
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && onJoinButtonClick();
  };

  const onJoinButtonClick = () => {
    roomName && navigate(`/${roomName}`);
  };

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Box py={8} sx={{ backgroundColor: 'background.paper' }} >
        <Container sx={{ height: '100%' }}>
          <Box
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            py={10}
          >
            <Stack justifyContent="center" textAlign="left">
              <Box marginBottom={6}>
                <Typography variant="h2" color="primary">
                  Online planning poker
                </Typography>
                <Typography variant="h2">
                  at its simplest
                </Typography>
                <Typography variant="subtitle1" mt={2}>
                  Create your planning room and get started for free
                </Typography>
              </Box>
              <Box maxWidth="420px">
                <Stack
                  spacing={2}
                  justifyContent="center"
                  textAlign="center"
                >
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
            </Stack>
            <Box sx={{ display: { xs: 'none', md: 'initial' } }}>
              <PokeroIllus height={440} />
            </Box>
          </Box>
        </Container>
      </Box >
      <Box py={6}>
        <Container>
          <Grid container spacing={2}>
            <FeatureBox
              title="Real-time interaction"
              content="Vote, estimate, and discuss stories with your teammates in real-time"
              icon={<PeopleIcon sx={{ color: 'background.default' }} fontSize="large" />}
            />
            <FeatureBox
              title="Statistics provided"
              content="Average and mode values are provided in each round for better insight and further discussion"
              icon={<EqualizerIcon sx={{ color: 'background.default' }} fontSize="large" />}
            />
            <FeatureBox
              title="Facilitator mode"
              content="Sharing your screen? Enable facilitator mode to hide your selected option to avoid estimation bias"
              chipContent="New"
              chipVariant="secondary"
              icon={<VisibilityOffIcon sx={{ color: 'background.default' }} fontSize="large" />}
            />
          </Grid>
        </Container>
      </Box>
      <Container>
        <Box
          p={2}
          width="100%"
          display="flex"
          justifyContent="center"
          color="gray"
        >
          <Typography variant="caption" sx={{ 'wordWrap': 'normal' }}>
            POKERO is developed by Warat Kaweepornpoj.
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default App;

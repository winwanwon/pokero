import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, remove, set } from "firebase/database";
import { Box, Container } from "@mui/material";
import { firebaseConfig } from "./config";

import PromptModal from "./PromptModal";
import PokerTable from "./PokerTable";
import PointButtonGroup from "./PointButtonGroup";
import CommandButtons from "./CommandButtons";
import { AppState } from "./enum";

const style = {
  height: '100%',
}

const App: React.FC = () => {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const uuid = window.sessionStorage.getItem("uuid") || uuidv4();
  window.sessionStorage.setItem("uuid", uuid);

  const [name, setName] = useState(window.localStorage.getItem("name") || "");
  const [modalOpen, setModalOpen] = useState(true);
  const [appState, setAppState] = useState<AppState>(AppState.Init);
  const [selectedOption, setSelectedOption] = useState<number>(-1);

  const usersRef = ref(database, 'users/');
  const thisUserRef = ref(database, 'users/' + uuid);
  const stateRef = ref(database, 'state/');

  const handleClose = () => { };
  const onSubmitName = () => {
    if (name) {
      window.localStorage.setItem("name", name);
      setModalOpen(false);
      set(thisUserRef, {
        name,
        selectedOption: -1,
      });
    }
  };

  window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();
    remove(thisUserRef);
  });

  const pokerTable = !modalOpen &&
    <PokerTable
      usersRef={usersRef}
      stateRef={stateRef}
      setSelectedOption={setSelectedOption}
      uuid={uuid}
      appState={appState}
      setAppState={setAppState}
    />;

  return (
    <Container maxWidth="xs" sx={style}>
      <PromptModal
        name="name"
        open={modalOpen}
        value={name}
        setValue={setName}
        onClose={handleClose}
        onSubmit={onSubmitName}
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
      >
        {pokerTable}
      </Box>
      <CommandButtons
        appState={appState}
        setAppState={setAppState}
        usersRef={usersRef}
        stateRef={stateRef}
      />
      <PointButtonGroup
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        appState={appState}
        thisUserRef={thisUserRef}
      />
    </Container>
  );
}

export default App;

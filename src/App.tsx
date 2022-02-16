import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { initializeApp } from "firebase/app";
import { get, getDatabase, onValue, ref, remove, set, update } from "firebase/database";
import { Box, Container } from "@mui/material";

import { firebaseConfig } from "./config";
import PromptModal from "./PromptModal";
import Summary from "./Summary";
import OptionButtonGroup from "./OptionButtonGroup";
import CommandButtons from "./CommandButtons";
import { AppState } from "./enum";
import { UserDatabase } from "./types";

const App: React.FC = () => {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const uuid = window.sessionStorage.getItem("uuid") || uuidv4();
  window.sessionStorage.setItem("uuid", uuid);

  const [name, setName] = useState(window.localStorage.getItem("name") || "");
  const [modalOpen, setModalOpen] = useState(true);
  const [appState, setAppState] = useState<AppState>(AppState.Init);
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [users, setUsers] = useState<UserDatabase>({});
  const usersDbPath = 'users/';
  const stateDbPath = 'state/';
  const thisUserDbPath = 'users/' + uuid;

  useEffect(() => {
    onValue(ref(database, usersDbPath), (snapshot) => {
      const dbSnap = snapshot.val();
      snapshot.size && setUsers(dbSnap);
    });

    onValue(ref(database, stateDbPath), (snapshot) => {
      const dbSnap = snapshot.val();
      setAppState(dbSnap.currentState);
      dbSnap.currentState === AppState.Revealed && setSelectedOption(-1);
    });

    get(ref(database, stateDbPath)).then((snapshot) => {
      if (!snapshot.exists()) {
        set(ref(database, stateDbPath), {
          currentState: AppState.Init,
        });
      } else {
        setAppState(snapshot.val().currentState);
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [database]);

  const onOptionSelect = (option: number) => {
    update(ref(database, thisUserDbPath), {
      selectedOption: option,
    });
  };

  const onAppStateUpdate = (appState: AppState) => {
    setAppState(appState);
    update(ref(database, stateDbPath), {
      currentState: appState,
    });
  }

  const resetAppState = () => {
    get(ref(database, usersDbPath)).then((snapshot) => {
      if (snapshot.exists()) {
        Object.keys(snapshot.val()).forEach((key: string) => {
          const updates = {} as any;
          updates['/' + key + '/selectedOption/'] = -1;
          update(ref(database, usersDbPath), updates);
        });
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const handleClose = () => { };
  const onSubmitName = () => {
    if (name) {
      window.localStorage.setItem("name", name);
      setModalOpen(false);
      set(ref(database, thisUserDbPath), {
        name,
        selectedOption: -1,
      });
    }
  };

  window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();
    remove(ref(database, thisUserDbPath));
  });

  const summary = !modalOpen &&
    <Summary
      appState={appState}
      uuid={uuid}
      users={users}
    />;

  return (
    <Container maxWidth="xs" sx={{ height: '100%' }}>
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
        {summary}
      </Box>
      <CommandButtons
        appState={appState}
        onAppStateUpdate={onAppStateUpdate}
        resetAppState={resetAppState}
      />
      <OptionButtonGroup
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        appState={appState}
        onOptionSelect={onOptionSelect}
      />
    </Container>
  );
}

export default App;

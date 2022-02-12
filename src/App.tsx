import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, remove, set } from "firebase/database";
import { Container } from "@mui/material";
import { firebaseConfig } from "./config";

import PromptModal from "./PromptModal";
import PokerTable from "./PokerTable";
import PointButtonGroup from "./PointButtonGroup";

import "./App.css";

const App: React.FC = () => {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const uuid = window.sessionStorage.getItem("uuid") || uuidv4();
  window.sessionStorage.setItem("uuid", uuid);

  const [name, setName] = useState(window.localStorage.getItem("name") || "");
  const [modalOpen, setModalOpen] = useState(true);
  const usersRef = ref(database, 'users/');
  const thisUserRef = ref(database, 'users/' + uuid);

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

  return (
    <Container maxWidth="xs">
      <PromptModal
        name="name"
        open={modalOpen}
        value={name}
        setValue={setName}
        onClose={handleClose}
        onSubmit={onSubmitName}
      />
      {!modalOpen && <PokerTable usersRef={usersRef} />}
      <PointButtonGroup
        thisUserRef={thisUserRef}
      />
    </Container>
  );
}

export default App;

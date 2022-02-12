import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { initializeApp } from "@firebase/app";
import { getDatabase, ref, remove, set } from "@firebase/database";
import { Container } from "@mui/material";

import PromptModal from "./PromptModal";
import PokerTable from "./PokerTable";
import { firebaseConfig } from "./config";

import "./App.css";

const App: React.FC = () => {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const uuid = uuidv4();

  const [name, setName] = useState(window.localStorage.getItem("name") || "");
  const [modalOpen, setModalOpen] = useState(true);
  const usersRef = ref(database, 'users/');

  const handleClose = () => { };
  const onSubmitName = () => {
    if (name) {
      window.localStorage.setItem("name", name);
      setModalOpen(false);
      set(ref(database, 'users/' + uuid), {
        name,
      });
    }
  };

  window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();
    remove(ref(database, 'users/' + uuid));
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
    </Container>
  );
}

export default App;

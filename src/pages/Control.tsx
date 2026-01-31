import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FirebaseApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from "firebase/database";
import { Info } from 'lucide-react';

import { AppState, PokerMode } from "../enum";
import { isValidRoomName } from "../utils";

import OptionButtonGroup from "../components/OptionButtonGroup";
import OfflineIndicator from "../components/OfflineIndicator";

interface Props {
    firebaseApp: FirebaseApp;
}

const Control: React.FC<Props> = (props: Props) => {
    const app = props.firebaseApp;
    const database = getDatabase(app);
    const uuid = window.localStorage.getItem("uuid")
    const name = window.localStorage.getItem("name")

    const params = useParams();
    const roomName = params.roomName?.toLowerCase() || "";
    const [appState, setAppState] = useState<AppState>(AppState.Init);
    const [pokerMode, setPokerMode] = useState<PokerMode>(PokerMode.Fibonacci);
    const [selectedOption, setSelectedOption] = useState<number | string>(-1);
    const stateDbPath = roomName + '/state/';
    const thisUserDbPath = roomName + '/users/' + uuid;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isValidRoomName(roomName) || !uuid) {
            navigate('/');
        }
    }, [roomName, navigate, uuid]);


    useEffect(() => {
        onValue(ref(database, thisUserDbPath), (snapshot) => {
            const dbSnap = snapshot.val();
            dbSnap && setSelectedOption(dbSnap.selectedOption);
        });

        onValue(ref(database, stateDbPath), (snapshot) => {
            const dbSnap = snapshot.val();
            dbSnap && setAppState(dbSnap.currentState);
            dbSnap && setPokerMode(dbSnap.pokerMode || PokerMode.Fibonacci);
        });
    }, [database, stateDbPath, thisUserDbPath]);

    const onOptionSelect = (option: number | string) => {
        update(ref(database, thisUserDbPath), {
            selectedOption: option,
        });
    };

    const optionButtons = (
        <OptionButtonGroup
            pokerMode={pokerMode}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            appState={appState}
            onOptionSelect={onOptionSelect}
            visibility={true}
        />
    );

    const renderWaitMessage = () => {
        return (
            <p className="text-center">
                Options will be available once the points get reset.
            </p>
        )
    }

    return (
        <>
            <OfflineIndicator />
            <div className="flex h-screen justify-center items-center">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center">
                    <Info size={16} />
                    <span className="text-xs ml-2">Selecting an option for</span>
                    <span className="text-xs font-semibold">&nbsp;{name}</span>
                </div>
                {appState === AppState.Init && optionButtons}
                {appState === AppState.Revealed && renderWaitMessage()}
            </div>
        </div>
        </>
    );
}

export default Control;

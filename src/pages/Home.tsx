import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TagIcon from '@mui/icons-material/Tag';
import PeopleIcon from '@mui/icons-material/People';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { isValidRoomName } from "../utils";
import { FeatureBox } from "../components/FeatureBox";
import Header from "../components/Header";

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
      <Header />
      <div className="w-full max-w-none min-h-fit bg-slate-50 pt-20">
        <div className="container max-w-6xl mx-auto pt-12 pb-24 px-5">
          <div className="md:w-3/5">
            <div className="mt-4">
              <span className="font-extrabold lg:text-7xl text-4xl text-gray-800">Planning Poker,</span><br />
              <span className="font-extrabold lg:text-7xl text-4xl text-teal-500">Simplified.</span>
            </div>
            <div className="mt-4">
              <span className="lg:text-xl text-base">
                POKERO helps you simplify agile project estimation.<br />
                Collaborate with ease, plan effectively and deliver efficiently.
              </span>
            </div>
            <div className="mt-8">
              <TagIcon className="absolute mx-4 my-3" />
              <input
                type="text"
                className="border-solid border-2 border-teal-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-300 caret-teal-500 p-2 pl-12 rounded-lg text-lg w-full max-w-md"
                placeholder="Enter room name here"
                onChange={onChange}
                onKeyPress={onKeyPress}
                value={roomName}
              />
            </div>
            <div className="mt-2">
              <button
                className="shadow-lg bg-teal-500 text-white disabled:bg-slate-200 disabled:text-slate-400 py-2 rounded-lg font-bold text-lg w-full max-w-md"
                disabled={!roomName}
                onClick={onJoinButtonClick}
              >
                Join {roomName && `#${roomName}`}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-6xl mx-auto py-12 px-5">
        <div className="font-extrabold lg:text-5xl text-2xl text-gray-800 text-center my-12">
          Packed with Features
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <FeatureBox
            title="Real-time interaction"
            content="Vote, estimate, and discuss stories with your teammates in real-time"
            icon={<PeopleIcon sx={{ color: 'background.default' }} fontSize="large" />}
          />
          <FeatureBox
            title="Statistics provided"
            content="We provide you with statistics about your team's estimations, including average and majority picks."
            icon={<EqualizerIcon sx={{ color: 'background.default' }} fontSize="large" />}
          />
          <FeatureBox
            title="Facilitator mode"
            content="Sharing your screen? POKERO allows you to split your options to another window and hide them from your teammates"
            chipVariant="secondary"
            icon={<VisibilityOffIcon sx={{ color: 'background.default' }} fontSize="large" />}
          />
        </div>
      </div>
      <div className="container max-w-6xl mx-auto py-8 px-5 text-center">
        <div className="text-xs text-slate-500 my-1">
          Copyright © 2023 Pokero. All rights reserved.
        </div>
        <div className="text-xs text-slate-500 my-1">
          Contribute to this project on <a className="dercoration-teal-500 underline text-teal-500" target="_blank" href="https://github.com/winwanwon/pokero" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </>
  );
}

export default App;

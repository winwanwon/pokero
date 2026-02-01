import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hash, Users, BarChart3, EyeOff } from 'lucide-react';
import { isValidRoomName } from "../utils";
import { FeatureBox } from "../components/FeatureBox";
import Header from "../components/Header";
import OfflineIndicator from "../components/OfflineIndicator";

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
      <OfflineIndicator />
      <Header />
      <div className="w-full max-w-none min-h-fit bg-background pt-20">
        <div className="container max-w-6xl mx-auto pt-12 pb-24 px-5">
          <div className="md:w-3/5">
            <div className="mt-4">
              <span className="font-extrabold lg:text-7xl text-4xl text-foreground">Planning Poker</span><br />
              <span className="font-extrabold lg:text-7xl text-4xl text-primary">Made Easy.</span>
            </div>
            <div className="mt-4">
              <span className="lg:text-xl text-base text-foreground">
                Effortlessly estimate agile projects with Pokero.<br />
                Work remotely, collaborate effectively, deliver with ease.
              </span>
            </div>
            <div className="mt-8">
              <label htmlFor="room-name-input" className="sr-only">Room name</label>
              <Hash className="absolute mx-4 my-3 text-foreground" size={24} aria-hidden="true" />
              <input
                id="room-name-input"
                type="text"
                className="border-solid border-2 border-primary bg-background text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 caret-primary p-2 pl-12 rounded-lg text-lg w-full max-w-md"
                placeholder="Enter room name here"
                onChange={onChange}
                onKeyPress={onKeyPress}
                autoFocus={true}
                value={roomName}
                aria-label="Room name"
                aria-required="true"
              />
            </div>
            <div className="mt-2">
              <button
                className="shadow-lg bg-primary text-primary-foreground disabled:bg-muted disabled:text-muted-foreground py-2 rounded-lg font-bold text-lg w-full max-w-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed"
                disabled={!roomName}
                onClick={onJoinButtonClick}
                aria-label={roomName ? `Join room ${roomName}` : 'Join room'}
              >
                Join {roomName && `#${roomName}`}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-6xl mx-auto py-12 px-5">
        <div className="font-extrabold lg:text-5xl text-2xl text-foreground text-center my-12">
          Packed with Features
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <FeatureBox
            title="Real-time interaction"
            content="Vote, estimate, and discuss stories with your teammates in real-time"
            icon={<Users className="text-background" size={36} />}
          />
          <FeatureBox
            title="Statistics provided"
            content="We provide you with statistics about your team's estimations, including average and majority picks."
            icon={<BarChart3 className="text-background" size={36} />}
          />
          <FeatureBox
            title="Facilitator mode"
            content="Sharing your screen? POKERO allows you to split your options to another window and hide them from your teammates"
            chipVariant="secondary"
            icon={<EyeOff className="text-background" size={36} />}
          />
        </div>
      </div>
      <div className="container max-w-6xl mx-auto py-8 px-5 text-center">
        <div className="text-xs text-muted-foreground my-1">
          Copyright © {new Date().getFullYear()} Pokero. All rights reserved.
        </div>
        <div className="text-xs text-muted-foreground my-1">
          Contribute to this project on <a className="decoration-primary underline text-primary hover:text-primary/80" target="_blank" href="https://github.com/winwanwon/pokero" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </>
  );
}

export default App;

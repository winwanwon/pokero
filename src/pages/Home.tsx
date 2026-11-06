import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, EyeOff } from "lucide-react";
import { isValidRoomName } from "../utils";
import { FeatureBox } from "../components/FeatureBox";
import Header from "../components/Header";
import OfflineIndicator from "../components/OfflineIndicator";
import HomeDemo from "../components/HomeDemo";
import DeckExplorer from "../components/DeckExplorer";

const STEPS = [
  { title: "Name a room", content: "Pick any name. There's nothing to set up." },
  { title: "Share the link", content: "Your team joins from a browser, on a laptop or a phone." },
  { title: "Vote, then reveal", content: "Everyone picks in private. Flip the cards together and talk through the gaps." },
];

const MINI_CARD = "flex aspect-[5/7] w-12 items-center justify-center rounded-md border-2";

interface RoomFormProps {
  id: string;
  autoFocus?: boolean;
  roomName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onJoin: () => void;
}

const RoomForm: React.FC<RoomFormProps> = ({ id, autoFocus, roomName, onChange, onJoin }) => (
  <div className="flex w-full max-w-[520px] flex-col gap-2.5 sm:flex-row">
    <label htmlFor={id} className="sr-only">Room name</label>
    <div className="flex h-[54px] min-w-0 flex-1 items-center gap-1.5 rounded-lg border-2 border-primary bg-card px-3.5 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
      <span className="font-mono text-foreground" aria-hidden="true">#</span>
      <input
        id={id}
        type="text"
        className="min-w-0 flex-1 bg-transparent text-[17px] text-foreground caret-primary outline-none placeholder:text-muted-foreground"
        placeholder="Name your room"
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && onJoin()}
        autoFocus={autoFocus}
        value={roomName}
        aria-required="true"
      />
    </div>
    <button
      className="h-[54px] flex-none rounded-lg bg-primary px-7 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
      disabled={!roomName}
      onClick={onJoin}
      aria-label={roomName ? `Join room ${roomName}` : 'Join room'}
    >
      Join {roomName && `#${roomName}`}
    </button>
  </div>
);

const App: React.FC = () => {
  let navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isValidRoomName(e.target.value) && setRoomName(e.target.value.toLowerCase());
  }

  const onJoinButtonClick = () => {
    roomName && navigate(`/${roomName}`);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(hsl(var(--border)) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 70% 100% at 50% 0%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 100% at 50% 0%, black 30%, transparent 100%)',
        }}
      />
      <OfflineIndicator />
      <div className="relative">
        <Header />
        <main className="mx-auto max-w-5xl px-4 sm:px-5">
          <section className="flex animate-in fade-in slide-in-from-bottom-2 flex-col items-center gap-5 pb-10 pt-8 text-center duration-500 motion-reduce:animate-none sm:pb-12 sm:pt-14">
            <h1 className="text-[44px] font-semibold leading-[1.05] tracking-[-1.5px] text-foreground sm:text-[68px] sm:tracking-[-2.5px]">
              Planning poker,<br />
              <span className="text-primary-text">made easy.</span>
            </h1>
            <p className="max-w-[34em] text-[17px] leading-normal text-muted-foreground [text-wrap:balance] sm:text-[19px]">
              Name a room, share the link, and start estimating. No sign-ups, no ads.
            </p>
            <RoomForm id="room-name-input" autoFocus roomName={roomName} onChange={onChange} onJoin={onJoinButtonClick} />
          </section>

          <HomeDemo />

          <section className="pt-16 sm:pt-24">
            <h2 className="text-[26px] font-semibold tracking-[-0.6px] sm:text-[34px]">How it works</h2>
            <ol className="mt-5 grid gap-6 sm:mt-8 md:grid-cols-3 md:gap-8">
              {STEPS.map((step, index) => (
                <li key={step.title} className="border-t-2 border-primary pt-4">
                  <div className="font-mono text-sm font-semibold text-primary-text">{index + 1}</div>
                  <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1 text-[15px] leading-normal text-muted-foreground">{step.content}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="pt-16 sm:pt-24">
            <h2 className="mb-6 text-[26px] font-semibold tracking-[-0.6px] sm:mb-8 sm:text-[34px]">
              Use the scale your team already knows
            </h2>
            <DeckExplorer />
          </section>

          <section className="pt-16 sm:pt-20">
            <h2 className="mb-6 text-[26px] font-semibold tracking-[-0.6px] sm:mb-8 sm:text-[34px]">
              Made for real planning sessions
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureBox
                title="See votes come in"
                content="Everyone's card appears the moment they vote, so you know who you're waiting on."
                visual={(
                  <div className="flex gap-1.5">
                    <div className={`${MINI_CARD} border-secondary bg-secondary text-secondary-foreground`}><Check size={18} /></div>
                    <div className={`${MINI_CARD} border-secondary bg-secondary text-secondary-foreground`}><Check size={18} /></div>
                    <div className={`${MINI_CARD} border-dashed border-muted-foreground font-mono font-semibold text-muted-foreground`}>?</div>
                  </div>
                )}
              />
              <FeatureBox
                title="See where you stand"
                content="Each round shows the average, the majority, and how the votes spread out."
                visual={(
                  <div className="flex h-[68px] w-[120px] items-end gap-1.5">
                    <div className="h-1/3 flex-1 rounded-sm bg-muted-foreground" />
                    <div className="h-full flex-1 rounded-sm bg-primary" />
                    <div className="h-2/3 flex-1 rounded-sm bg-muted-foreground" />
                    <div className="h-1 flex-1 rounded-sm bg-border" />
                  </div>
                )}
              />
              <FeatureBox
                title="Share your screen safely"
                content="Facilitating? Open your cards in a separate window so nobody sees your vote."
                visual={(
                  <div className={`${MINI_CARD} border-secondary bg-secondary text-secondary-foreground`}><EyeOff size={18} /></div>
                )}
              />
              <FeatureBox
                title="Vote from your keyboard"
                content="Press a key from Q onwards to pick a card. Press it again to change your mind."
                visual={(
                  <div className="flex gap-1.5">
                    {['Q', 'W', 'E', 'R'].map((key, index) => (
                      <kbd key={key} className={`flex h-10 w-10 items-center justify-center rounded-md border border-b-[3px] font-mono text-sm font-semibold ${index === 2 ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-background text-foreground'}`}>
                        {key}
                      </kbd>
                    ))}
                  </div>
                )}
              />
            </div>
          </section>

          <section className="flex flex-col items-center gap-5 py-16 text-center sm:py-24">
            <h2 className="text-[26px] font-semibold tracking-[-0.6px] sm:text-[34px]">Got a planning session coming up?</h2>
            <RoomForm id="room-name-input-footer" roomName={roomName} onChange={onChange} onJoin={onJoinButtonClick} />
          </section>
        </main>
        <footer className="border-t border-border px-5 py-6 text-center text-xs leading-relaxed text-muted-foreground">
          <div>© {new Date().getFullYear()} Pokero</div>
          <div>
            Pokero is open source. <a className="text-primary-text underline hover:text-primary-text/80" target="_blank" href="https://github.com/winwanwon/pokero" rel="noreferrer">Contribute on GitHub</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;

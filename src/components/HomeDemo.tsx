import React, { useEffect, useMemo, useState } from 'react';
import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Result from './Result';
import { DEFAULT_POKER_OPTIONS } from '../constants/pokerMode';
import { getAverageFromResult, getMajorityFromResult } from '../utils';

const PLAYERS = ['Mai', 'Theo', 'Priya', 'Nok'];
const ROUNDS = [
    [5, 8, 5, 3],
    [3, 3, 5, 3],
    [8, 8, 8, 8],
];
const YOU = 'You';
const FALLBACK_PICK = 5;
const VOTE_DELAY = 700;
const REVEAL_DELAY = 800;
const YOUR_TURN_TIMEOUT = 6000;
const NEXT_ROUND_DELAY = 6000;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface CardProps {
    name: string;
    vote: number | null;
    voted: boolean;
    revealed: boolean;
    isMajority: boolean;
    bold?: boolean;
    index: number;
}

const DemoCard: React.FC<CardProps> = ({ name, vote, voted, revealed, isMajority, bold, index }) => (
    <div className="flex w-[60px] flex-col items-center gap-1.5 sm:w-[112px] sm:gap-2">
        <div className="aspect-[5/7] w-full [perspective:800px]">
            <div
                className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none ${revealed ? '[transform:rotateY(180deg)]' : ''}`}
                style={{ transitionDelay: revealed ? `${index * 70}ms` : '0ms' }}
            >
                <div
                    className={`absolute inset-0 flex items-center justify-center rounded-lg border-2 [backface-visibility:hidden] sm:rounded-[10px] ${voted ? 'border-secondary bg-secondary text-secondary-foreground' : 'border-dashed border-muted-foreground text-muted-foreground'}`}
                >
                    {voted
                        ? <Check className="h-6 w-6 sm:h-9 sm:w-9" aria-hidden="true" />
                        : <span className="animate-pulse font-mono text-2xl font-semibold sm:text-4xl">?</span>}
                </div>
                <div
                    className={`absolute inset-0 flex items-center justify-center rounded-lg border-2 font-mono text-2xl font-semibold [backface-visibility:hidden] [transform:rotateY(180deg)] sm:rounded-[10px] sm:text-[40px] ${isMajority ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-card text-card-foreground'}`}
                >
                    {vote ?? '-'}
                </div>
            </div>
        </div>
        <div className={`max-w-full truncate text-xs sm:text-sm ${bold ? 'font-bold' : 'font-medium'}`}>{name}</div>
    </div>
);

const HomeDemo: React.FC = () => {
    const [round, setRound] = useState(0);
    const [votedCount, setVotedCount] = useState(0);
    const [pick, setPick] = useState<number | null>(null);
    const [revealed, setRevealed] = useState(false);
    const [reduceMotion] = useState(prefersReducedMotion);

    const othersVoted = votedCount === PLAYERS.length;

    const startNextRound = () => {
        setRound((current) => (current + 1) % ROUNDS.length);
        setVotedCount(reduceMotion ? PLAYERS.length : 0);
        setPick(null);
        setRevealed(false);
    };

    useEffect(() => {
        if (reduceMotion) {
            setVotedCount(PLAYERS.length);
            return;
        }
        if (revealed) {
            const timer = setTimeout(startNextRound, NEXT_ROUND_DELAY);
            return () => clearTimeout(timer);
        }
        if (!othersVoted) {
            const timer = setTimeout(() => setVotedCount((count) => count + 1), VOTE_DELAY);
            return () => clearTimeout(timer);
        }
        if (pick !== null) {
            const timer = setTimeout(() => setRevealed(true), REVEAL_DELAY);
            return () => clearTimeout(timer);
        }
        const timer = setTimeout(() => setPick(FALLBACK_PICK), YOUR_TURN_TIMEOUT);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [votedCount, pick, revealed, othersVoted, reduceMotion]);

    const results = useMemo(() => {
        const users = PLAYERS.map((name, index) => ({ name, selectedOption: ROUNDS[round][index] }));
        if (pick !== null) users.push({ name: YOU, selectedOption: pick });
        return users;
    }, [round, pick]);

    const majorityOptions = getMajorityFromResult(results, DEFAULT_POKER_OPTIONS);
    const showsOwnVote = pick !== null;
    const totalVoted = votedCount + (showsOwnVote ? 1 : 0);

    const getStatus = () => {
        if (revealed) return 'Cards are up';
        if (othersVoted && !showsOwnVote) return 'Your turn. Pick a card.';
        return `${totalVoted} of ${PLAYERS.length + 1} voted`;
    };

    return (
        <section
            aria-label="Try a quick round"
            className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        >
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
                <div className="truncate font-mono text-sm font-medium"># try-it-out</div>
                <div className="flex-none text-sm font-medium text-muted-foreground">{getStatus()}</div>
            </div>

            <div className="flex justify-center gap-2 bg-background px-3 py-6 sm:gap-4 sm:py-8">
                {PLAYERS.map((name, index) => (
                    <DemoCard
                        key={name}
                        index={index}
                        name={name}
                        vote={ROUNDS[round][index]}
                        voted={index < votedCount}
                        revealed={revealed}
                        isMajority={majorityOptions.includes(ROUNDS[round][index])}
                    />
                ))}
                <DemoCard
                    index={PLAYERS.length}
                    name={YOU}
                    vote={pick}
                    voted={showsOwnVote}
                    revealed={revealed}
                    isMajority={pick !== null && majorityOptions.includes(pick)}
                    bold
                />
            </div>

            <div className="flex min-h-[208px] items-center justify-center border-t border-border p-3 sm:min-h-[148px] sm:p-4">
                {revealed ? (
                    <Result
                        average={getAverageFromResult(results)}
                        majorityOptions={majorityOptions}
                        options={DEFAULT_POKER_OPTIONS}
                        votes={results.map((user) => user.selectedOption)}
                        action={(
                            <Button variant="secondary" onClick={startNextRound} className="h-[52px] w-full rounded-lg text-base font-semibold">
                                Next round
                            </Button>
                        )}
                    />
                ) : (
                    <div className="flex flex-wrap justify-center gap-0.5 sm:gap-2">
                        {DEFAULT_POKER_OPTIONS.map((option) => {
                            const isSelected = option === pick;
                            return (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setPick(isSelected ? null : (option as number))}
                                    aria-pressed={isSelected}
                                    aria-label={`Vote ${option}`}
                                    className={`flex aspect-[5/7] w-[43px] flex-none items-center justify-center rounded-md border font-mono text-lg font-semibold shadow-sm transition duration-100 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-[60px] sm:text-xl ${isSelected ? 'border-primary bg-primary text-primary-foreground sm:-translate-y-1.5' : 'border-input bg-card text-card-foreground hover:-translate-y-1 hover:border-primary'}`}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default HomeDemo;

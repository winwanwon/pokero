import React from 'react';
import { Check, X } from 'lucide-react';

import { UserDatabase } from '../types';
import { AppState } from '../enum';
import { PokerOption } from '../utils';

interface OwnProps {
    appState: AppState;
    users: UserDatabase;
    uuid: string;
    showDeleteButton: boolean;
    onRemove: (uuid: string) => void;
    majorityOptions: PokerOption[];
}

const PlayArea: React.FC<OwnProps> = (props: OwnProps) => {
    const { appState, uuid, users, onRemove, majorityOptions, showDeleteButton } = props;
    const isRevealed = appState === AppState.Revealed;

    return (
        <div className="m-auto flex flex-wrap justify-center gap-x-2.5 gap-y-3.5 sm:gap-x-5 sm:gap-y-4">
            {Object.keys(users).map((key) => {
                const { name, selectedOption } = users[key];
                const selected = selectedOption !== -1;
                const isMajority = isRevealed && selected && majorityOptions.includes(selectedOption);

                const playerStatus = isRevealed
                    ? (selected ? `Voted ${selectedOption}` : 'No vote')
                    : (selected ? 'Vote submitted' : 'Waiting to vote');

                const cardStyles = () => {
                    if (!selected) return 'border-dashed border-muted-foreground text-muted-foreground';
                    if (isMajority) return 'border-primary bg-primary text-primary-foreground';
                    if (isRevealed) return 'border-input bg-card text-card-foreground';
                    return 'border-secondary bg-secondary text-secondary-foreground';
                };

                const renderFace = () => {
                    if (isRevealed) return selected ? selectedOption : '-';
                    return selected
                        ? <Check className="h-7 w-7 sm:h-10 sm:w-10" aria-hidden="true" />
                        : <span className="animate-pulse">?</span>;
                };

                return (
                    <div
                        key={key}
                        className="relative flex w-[78px] flex-col items-center gap-1.5 sm:w-[132px] sm:gap-2"
                        role="article"
                        aria-label={`${name}: ${playerStatus}`}
                    >
                        <div
                            className={`flex aspect-[5/7] w-full items-center justify-center rounded-lg border-2 font-mono font-semibold transition-colors duration-300 sm:rounded-[10px] ${String(selectedOption).length > 2 && isRevealed ? 'text-xl sm:text-[34px]' : 'text-[28px] sm:text-[46px]'} ${cardStyles()}`}
                        >
                            {renderFace()}
                        </div>
                        <div className={`max-w-full truncate text-[13px] sm:text-[15px] ${key === uuid ? 'font-bold' : 'font-medium'}`}>
                            {name}
                        </div>
                        {showDeleteButton && key !== uuid && (
                            <button
                                className="absolute -right-2 -top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-lg transition-all duration-200 hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2"
                                onClick={() => onRemove(key)}
                                aria-label={`Remove ${name} from room`}
                            >
                                <X size={14} aria-hidden="true" />
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default PlayArea;

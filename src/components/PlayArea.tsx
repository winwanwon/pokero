import React from 'react';
import { Check, X } from 'lucide-react';

import { UserDatabase } from '../types';
import { AppState } from '../enum';

interface OwnProps {
    appState: AppState;
    users: UserDatabase;
    uuid: string;
    showDeleteButton: boolean;
    onRemove: (uuid: string) => void;
}

const PlayArea: React.FC<OwnProps> = (props: OwnProps) => {
    const { appState, uuid, users, onRemove } = props;
    const userCount = Object.keys(users).length;

    const renderAttendees = Object.keys(users).map((key) => {
        const selected = users[key].selectedOption !== -1;
        const isRevealed = appState === AppState.Revealed;
        const confirmedValue = selected || isRevealed;

        const removePlayer = () => {
            onRemove(key)
        }

        const nonSelectedCardStyles = "border-border";
        const selectedCardStyles = "border-primary shadow-primary/40";
        const circleBorderStyles = "flex w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-2 rounded-full justify-center items-center";

        const renderStatusMarker = () => {
            if (!selected) {
                return (
                    <div className={`${circleBorderStyles} border-border animate-pulse`} aria-label="Waiting for selection">
                        <span className="text-xl sm:text-2xl md:text-3xl font-black text-muted-foreground">
                            ?
                        </span>
                    </div>
                );
            }
            return (
                <div className={`${circleBorderStyles} border-primary`} aria-label="Selection confirmed">
                    <Check className="text-primary" size={32} aria-hidden="true" />
                </div>
            );
        }

        const renderPoint = () => {
            return (
                <div className={`${circleBorderStyles} border-primary`}>
                    <span className="text-xl sm:text-2xl md:text-3xl font-black text-primary">
                        {selected ? users[key].selectedOption : "-"}
                    </span>
                </div>
            );
        }

        const playerStatus = isRevealed
            ? `Voted ${users[key].selectedOption}`
            : (selected ? 'Vote submitted' : 'Waiting to vote');

        return (
            <div
                key={key}
                className={`relative h-28 w-24 sm:h-32 sm:w-28 py-3 border rounded-lg shadow-md bg-card flex flex-col justify-between items-center transition-all duration-300 ${confirmedValue ? selectedCardStyles : nonSelectedCardStyles}`}
                role="article"
                aria-label={`${users[key].name}: ${playerStatus}`}
            >
                {props.showDeleteButton && key !== uuid && (
                    <button
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 flex items-center justify-center shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 z-10"
                        onClick={removePlayer}
                        aria-label={`Remove ${users[key].name} from room`}
                    >
                        <X size={14} aria-hidden="true" />
                    </button>
                )}
                {isRevealed ? renderPoint() : renderStatusMarker()}
                <div className={`text-card-foreground text-xs sm:text-sm text-center px-1 ${key === uuid ? 'font-bold' : ''}`}>
                    <div className="truncate max-w-full">{users[key].name}</div>
                </div>
            </div>
        );
    });

    const getGridClass = () => {
        // Mobile: 2-3 columns, Desktop: up to 6 columns in a row
        if (userCount === 1) return 'grid-cols-1';
        if (userCount === 2) return 'grid-cols-2 md:grid-cols-2';
        if (userCount <= 6) return 'grid-cols-3 md:grid-cols-6';
        // 7+ players: 3 columns on mobile, 6 on desktop (creates multiple rows)
        return 'grid-cols-3 md:grid-cols-6';
    };

    return (
        <div className={`grid gap-2 sm:gap-3 md:gap-4 ${getGridClass()}`}>
            {renderAttendees}
        </div>
    );

}

export default PlayArea;

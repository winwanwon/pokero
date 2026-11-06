import React, { useState } from 'react';

import { PokerModeOptions } from '../constants/pokerMode';

const DeckExplorer: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const deck = PokerModeOptions[selectedIndex];
    const hasLongLabel = deck.value.some((value) => String(value).length > 2);

    return (
        <div className="grid gap-5 md:grid-cols-[260px_minmax(0,1fr)] md:gap-10">
            <div className="flex flex-wrap gap-2 md:flex-col md:gap-1" role="group" aria-label="Decks">
                {PokerModeOptions.map((option, index) => (
                    <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelectedIndex(index)}
                        aria-pressed={index === selectedIndex}
                        className={`h-11 rounded-lg px-3.5 text-left text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${index === selectedIndex ? 'bg-secondary text-secondary-foreground' : 'text-foreground hover:bg-muted'}`}
                    >
                        {option.name}
                    </button>
                ))}
            </div>
            <div key={deck.id} className="min-h-[190px] animate-in fade-in duration-300 motion-reduce:animate-none">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {deck.value.map((value) => (
                        <div
                            key={value}
                            className={`flex aspect-[5/7] w-[60px] items-center justify-center rounded-lg border border-input bg-card font-mono font-semibold text-card-foreground shadow-sm sm:w-[76px] ${hasLongLabel ? 'text-base sm:text-lg' : 'text-xl sm:text-2xl'}`}
                        >
                            {value}
                        </div>
                    ))}
                </div>
                <p className="mt-4 max-w-[34em] text-[15px] leading-normal text-muted-foreground">{deck.desc}</p>
            </div>
        </div>
    );
};

export default DeckExplorer;

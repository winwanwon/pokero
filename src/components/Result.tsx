import React from 'react';

import { getVoteCounts, PokerOption } from '../utils';

interface Props {
    average: number | null;
    majorityOptions: PokerOption[];
    options: PokerOption[];
    votes: PokerOption[];
    action: JSX.Element;
}

const MAX_BAR_HEIGHT = 56;
const EMPTY_BAR_HEIGHT = 3;

const Result: React.FC<Props> = (props) => {
    const { average, majorityOptions, options, votes, action } = props;
    const counts = getVoteCounts(votes);
    const topCount = Math.max(0, ...Object.values(counts));
    const majority = majorityOptions.length > 0 ? majorityOptions.join(' / ') : '-';
    const averageValue = average !== null ? average.toFixed(1) : '-';

    return (
        <div
            className="mx-auto flex w-full max-w-[860px] flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-9 sm:gap-y-5 sm:rounded-[10px] sm:border sm:border-border sm:bg-card sm:px-5 sm:py-4"
            role="region"
            aria-label="Voting results"
        >
            <div className="flex min-w-0 flex-1 items-center gap-5 sm:gap-9">
                <div>
                    <div className={`font-mono font-semibold leading-[44px] text-primary-text sm:leading-[48px] ${majority.length > 3 ? 'text-xl sm:text-[28px]' : 'text-[38px] sm:text-[44px]'}`}>
                        {majority}
                    </div>
                    <div className="text-[13px] text-muted-foreground sm:text-sm">Majority</div>
                </div>
                <div>
                    <div className="font-mono text-[38px] font-semibold leading-[44px] sm:text-[44px] sm:leading-[48px]">
                        {averageValue}
                    </div>
                    <div className="text-[13px] text-muted-foreground sm:text-sm">Average</div>
                </div>
                <div
                    className="grid min-w-0 flex-1 items-end gap-1 sm:gap-1.5"
                    style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
                    aria-label="Vote distribution"
                    role="img"
                >
                    {options.map((option) => {
                        const count = counts[option] || 0;
                        const isMajority = majorityOptions.includes(option);
                        const barColor = !count ? 'bg-border' : isMajority ? 'bg-primary' : 'bg-muted-foreground';

                        return (
                            <div key={option} className="flex h-[72px] min-w-0 flex-col justify-end gap-1">
                                <div
                                    className={`rounded-sm transition-all duration-500 ${barColor}`}
                                    style={{ height: count ? (count / topCount) * MAX_BAR_HEIGHT : EMPTY_BAR_HEIGHT }}
                                />
                                <div className={`truncate text-center font-mono text-[10px] font-semibold sm:text-xs ${isMajority ? 'text-primary-text' : 'text-muted-foreground'}`}>
                                    {option}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="w-full sm:w-32">{action}</div>
        </div>
    )
}

export default Result;

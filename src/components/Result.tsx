import React from 'react';
import { Progress } from '@/components/ui/progress';

interface Props {
    average: number;
    mode: number;
}

const Result: React.FC<Props> = (props) => {
    const { average, mode } = props;
    const averageValue = !!average ? average.toFixed(1) : "Not available";
    const modeValue = mode >= 0 ? mode : "Not available";

    return (
        <div
            className="border border-secondary rounded-lg px-4 py-2 flex flex-col sm:flex-row gap-4"
            role="region"
            aria-label="Voting results"
        >
            <div className="flex-1">
                <div className="text-sm font-medium mb-2" id="average-label">
                    Average: {!!average ? average.toFixed(1) : "-"}
                </div>
                {/* TODO: Update to use max value from available options */}
                <Progress
                    value={(!!average ? average / 13 : 0) * 100}
                    className="h-2 transition-all duration-500"
                    aria-labelledby="average-label"
                    aria-valuenow={average || 0}
                    aria-valuemin={0}
                    aria-valuemax={13}
                    aria-valuetext={`Average is ${averageValue}`}
                />
            </div>
            <div className="flex-1">
                <div className="text-sm font-medium mb-2" id="majority-label">
                    Majority: {mode >= 0 ? mode : "-"}
                </div>
                {/* TODO: Update to use max value from available options */}
                <Progress
                    value={(mode >= 0 ? mode / 13 : 0) * 100}
                    className="h-2 transition-all duration-500"
                    aria-labelledby="majority-label"
                    aria-valuenow={mode >= 0 ? mode : 0}
                    aria-valuemin={0}
                    aria-valuemax={13}
                    aria-valuetext={`Majority is ${modeValue}`}
                />
            </div>
        </div>
    )
}

export default Result;

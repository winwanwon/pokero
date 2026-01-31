import React from 'react';
import { Progress } from '@/components/ui/progress';

interface Props {
    average: number;
    mode: number;
}

const Result: React.FC<Props> = (props) => {
    const { average, mode } = props;
    return (
        <div className="border border-secondary rounded-lg px-4 py-2 flex gap-4">
            <div className="flex-1">
                <div className="text-sm font-medium mb-2">
                    Average: {!!average ? average.toFixed(1) : "-"}
                </div>
                {/* TODO: Update to use max value from available options */}
                <Progress value={(!!average ? average / 13 : 0) * 100} className="h-2" />
            </div>
            <div className="flex-1">
                <div className="text-sm font-medium mb-2">
                    Majority: {mode >= 0 ? mode : "-"}
                </div>
                {/* TODO: Update to use max value from available options */}
                <Progress value={(mode >= 0 ? mode / 13 : 0) * 100} className="h-2" />
            </div>
        </div>
    )
}

export default Result;

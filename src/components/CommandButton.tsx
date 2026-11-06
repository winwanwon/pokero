import React from 'react';
import { Button } from '@/components/ui/button';

interface OwnProps {
    content: string;
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
    onClick: () => void;
    resetAppState: () => void;
}

const CommandButton: React.FC<OwnProps> = (props: OwnProps) => {
    const { color, content, onClick } = props;

    // Map MUI colors to shadcn variants
    const getVariant = () => {
        if (color === "primary" || color === "success") return "default";
        if (color === "error") return "destructive";
        if (color === "secondary") return "secondary";
        return "outline";
    };

    return (
        <Button
            variant={getVariant()}
            onClick={onClick}
            className="h-[52px] w-full rounded-lg px-7 text-base font-semibold active:scale-95 transition-transform duration-100"
        >
            {content}
        </Button>
    )
}

export default CommandButton;

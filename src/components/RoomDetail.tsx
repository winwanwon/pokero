import React from 'react'
import { Share2, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OwnProps {
    roomName: string;
    onUrlCopied?: () => void;
    onOpenSettings?: () => void;
}

const RoomDetail: React.FC<OwnProps> = (props) => {
    const { roomName, onUrlCopied, onOpenSettings } = props;
    const copyUrl = () => {
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        onUrlCopied && onUrlCopied();
    };

    return (
        <div className="flex min-w-0 items-center">
            <h1 className="mr-1 min-w-0 truncate font-mono text-[15px] font-medium sm:mr-2">
                # {roomName}
            </h1>
            <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 flex-none text-primary-text focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                onClick={copyUrl}
                aria-label="Share room URL"
            >
                <Share2 />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 flex-none text-primary-text focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                onClick={onOpenSettings}
                aria-label="Open room settings"
            >
                <Settings />
            </Button>
        </div>
    );
}

export default RoomDetail;

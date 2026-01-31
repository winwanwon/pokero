import React from 'react'
import { Hash, Share2, Settings } from 'lucide-react';
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
        <div className="flex items-center">
            <div className="flex items-center mr-2">
                <Hash className="text-foreground" size={24} />
                <h6 className="text-xl font-semibold whitespace-nowrap">
                    {roomName}
                </h6>
            </div>
            <div>
                <Button variant="ghost" size="icon" className="text-primary" onClick={copyUrl}>
                    <Share2 size={20} />
                </Button>
            </div>
            <div>
                <Button variant="ghost" size="icon" className="text-primary" onClick={onOpenSettings}>
                    <Settings size={20} />
                </Button>
            </div>
        </div>
    );
}

export default RoomDetail;

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
        <div className="flex items-center gap-1">
            <div className="flex items-center mr-1 sm:mr-2">
                <Hash className="text-foreground hidden sm:block" size={24} aria-hidden="true" />
                <Hash className="text-foreground sm:hidden" size={20} aria-hidden="true" />
                <h6 className="text-base sm:text-xl font-semibold whitespace-nowrap truncate max-w-[120px] sm:max-w-none">
                    {roomName}
                </h6>
            </div>
            <div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-[44px] min-w-[44px]"
                    onClick={copyUrl}
                    aria-label="Share room URL"
                >
                    <Share2 className="hidden sm:block" size={20} />
                    <Share2 className="sm:hidden" size={18} />
                </Button>
            </div>
            <div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-[44px] min-w-[44px]"
                    onClick={onOpenSettings}
                    aria-label="Open room settings"
                >
                    <Settings className="hidden sm:block" size={20} />
                    <Settings className="sm:hidden" size={18} />
                </Button>
            </div>
        </div>
    );
}

export default RoomDetail;

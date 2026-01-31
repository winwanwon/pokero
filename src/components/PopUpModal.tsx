import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface OwnProps {
    title: string;
    label: string;
    open: boolean;
    value: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    onClose?: () => void;
    setValue?: (s: string) => void;
}

const PopUpModal: React.FC<OwnProps> = (props: OwnProps) => {
    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.onSubmit();
        }
    };

    return (
        <Dialog open={props.open} onOpenChange={props.onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{props.title}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="modal-input">{props.label}</Label>
                        <Input
                            id="modal-input"
                            onChange={props.onInputChange}
                            onKeyDown={onKeyPress}
                            value={props.value}
                            autoFocus={true}
                        />
                    </div>
                    <Button onClick={props.onSubmit} disabled={!props.value}>
                        Enter
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default PopUpModal;

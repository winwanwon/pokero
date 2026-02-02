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
        <Dialog open={props.open} modal>
            <DialogContent
                className="sm:max-w-[425px]"
                hideCloseButton
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
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
                            aria-required="true"
                            placeholder={`Enter your ${props.label.toLowerCase()}`}
                            className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        />
                    </div>
                    <Button
                        onClick={props.onSubmit}
                        disabled={!props.value}
                        className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        Enter
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default PopUpModal;

import React from 'react';

interface Props {
    title: string;
    content: string;
    visual: React.ReactNode;
}

const FeatureBox: React.FC<Props> = ({ title, content, visual }) => (
    <div className="flex flex-col rounded-[10px] border border-border bg-card p-5">
        <div className="mb-5 flex h-[84px] items-end" aria-hidden="true">
            {visual}
        </div>
        <h3 className="text-base font-semibold">
            {title}
        </h3>
        <p className="mt-1 text-sm leading-normal text-muted-foreground">
            {content}
        </p>
    </div>
);

export { FeatureBox };

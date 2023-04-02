import React from 'react';

interface Props {
    title: string;
    content: string;
    chipContent?: string;
    chipVariant?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    icon: JSX.Element;
}

const FeatureBox: React.FC<Props> = (props: Props) => (
    <div className="px-8 py-6 rounded-lg shadow-sm bg-slate-100">
        <div className="rounded-full bg-teal-500 w-14 h-14 mb-3 flex">
            <div className="m-auto justify-center content-center">
                {props.icon}
            </div>
        </div>
        <div className="font-bold text-xl mt-4 mb-2">
            {props.title}
        </div>
        <div>
            {props.content}
        </div>
    </div>
);

export { FeatureBox };

import React from 'react';

interface Props {
    backgroundColor?: string;
    render?: JSX.Element;
}

const NavBar: React.FC<Props> = (props) => {
    const { render, backgroundColor } = props;

    return (
        <header
            className="absolute top-0 left-0 right-0 shadow-none z-10"
            style={{ backgroundColor: backgroundColor || 'var(--background)' }}
        >
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex items-center py-3 sm:py-4">
                    <div className="flex w-full justify-between items-center">
                        <a href="/" className="flex items-center">
                            <img src="/pokero-logo-v2.png" alt="POKERO" className="h-7 sm:h-8" />
                        </a>
                    </div>
                    {render}
                </div>
            </div>
        </header>
    );
};

export { NavBar };

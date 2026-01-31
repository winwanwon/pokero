import React from 'react';

interface Props {
    backgroundColor?: string;
    render?: JSX.Element;
}

const NavBar: React.FC<Props> = (props) => {
    const { render, backgroundColor } = props;

    return (
        <header
            className="absolute top-0 left-0 right-0 shadow-none"
            style={{ backgroundColor: backgroundColor || 'var(--background)' }}
        >
            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex items-center py-4">
                    <div className="flex w-full justify-between items-center">
                        <a href="/">
                            <img src="/pokero-logo-v2.png" alt="POKERO" height="32" />
                        </a>
                    </div>
                    {render}
                </div>
            </div>
        </header>
    );
};

export { NavBar };

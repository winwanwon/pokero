import React from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import NotificationToggle from './NotificationToggle';

interface Props {
    render?: JSX.Element;
}

const Header: React.FC<Props> = ({ render }) => (
    <header className={render ? 'flex-none border-b border-border bg-card' : ''}>
        <div className={`flex h-[60px] items-center justify-between gap-2 sm:h-16 ${render ? 'pl-4 pr-1 sm:px-6' : 'mx-auto max-w-6xl px-5'}`}>
            <Link
                to="/"
                aria-label="Pokero home"
                className={render ? 'block w-6 flex-none overflow-hidden sm:w-auto' : 'block flex-none'}
            >
                <img
                    src="/pokero-logo-v3.png"
                    alt="POKERO"
                    className="h-6 max-w-none sm:h-7 dark:[filter:invert(1)_hue-rotate(180deg)]"
                />
            </Link>
            <div className="flex min-w-0 items-center">
                {render}
                <NotificationToggle />
                <DarkModeToggle />
            </div>
        </div>
    </header>
);

export default Header;

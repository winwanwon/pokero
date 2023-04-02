import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    render?: JSX.Element;
}

const Header: React.FC<Props> = (props: Props) => {
    const [top, setTop] = useState(true);

    // detect whether user has scrolled the page down by 10px 
    useEffect(() => {
        const scrollHandler = () => {
            window.pageYOffset > 10 ? setTop(false) : setTop(true)
        };
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [top]);

    return (
        <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top && 'bg-slate-50 backdrop-blur-sm shadow-lg'}`}>
            <div className="max-w-6xl mx-auto px-5">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 mr-4 w-36">
                        <Link to="/" className="block" aria-label="Cruip">
                            <img src="/pokero-logo-v3.png" alt="POKERO" height="32" />
                        </Link>
                    </div>
                    {props.render}
                </div>
            </div>
        </header>
    );
}

export default Header;

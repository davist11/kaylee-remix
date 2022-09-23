import { Link } from "@remix-run/react";
import cx from "classnames";
import { useState } from "react";
import FocusTrap from 'focus-trap-react'

import Logo from '~/components/svgs/Logo'
import Menu from '~/components/svgs/Menu'
import Close from '~/components/svgs/Close'

type NavLink = {
    url: string;
    label: string;
}

const links: NavLink[] = [
    {
        url: '',
        label: 'Design',
    },
    {
        url: 'photography',
        label: 'Photography',
    },
    {
        url: 'about',
        label: 'About',
    },
]

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMobileNav = () => {
        // TODO focus trap?
        setIsOpen(!isOpen)
    }

    return (
        // TODO update vertical padding
        <header className="max-w-1340 mx-auto px-32 pt-48 pb-64">
            <div className="flex justify-between items-center">
                <Link to="/" className="block">
                    <span className="sr-only">Kaylee Davis</span>

                    <div className="w-[72px] h-[52px] md:w-[120px] md:h-[86px]">
                        <Logo />
                    </div>
                </Link>
                <nav className="mdd:hidden w-[330px]">
                    <ul className="uppercase flex items-center justify-between">
                        {links.map(({ url, label }) => (
                            <li key={url}>
                                <Link
                                    to={url}
                                    className="transition-all hover:font-bold block"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <button className="md:hidden" onClick={toggleMobileNav}>
                    <span className="sr-only">Menu</span>

                    <Menu />
                </button>

                <div
                    className={cx(
                        'fixed inset-0 bg-white z-3 flex items-center text-center text-lg transition-all md:hidden',
                        {
                            'opacity-0 invisible': !isOpen,
                            'opacity-100 visible': isOpen,
                        }
                    )}
                >
                    <div className="absolute top-0 left-0 w-full px-32 pt-48 flex justify-between items-center">
                        <Link to="/" className="block w-[72px] h-[52px]">
                            <span className="sr-only">Kaylee Davis</span>

                            <Logo />
                        </Link>

                        <button onClick={toggleMobileNav}>
                            <span className="sr-only">Close</span>

                            <Close />
                        </button>
                    </div>

                    <nav className="w-full">
                        <ul className="uppercase">
                            {links.map(({ url, label }) => (
                                <li
                                    key={url}
                                    className="my-48 mx-8"
                                >
                                    <Link
                                        to={url}
                                        className="transition-all hover:font-bold block"
                                        onClick={toggleMobileNav}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

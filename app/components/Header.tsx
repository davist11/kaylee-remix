import { Link } from "@remix-run/react";
import cx from "classnames";
import { useState } from "react";

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

                <button
                    className="md:hidden"
                    onClick={toggleMobileNav}
                >
                    <span className="sr-only">Menu</span>

                    <Menu />
                </button>

                <div
                    className={cx(
                        'mdd:fixed mdd:inset-0 mdd:bg-white mdd:z-3 mdd:flex mdd:items-center mdd:text-center mdd:text-lg mdd:transition-all',
                        {
                            'mdd:opacity-0 mdd:invisible': !isOpen,
                            'mdd:opacity-100 mdd:visible': isOpen,
                        }
                    )}
                >
                    <div className="absolute top-0 left-0 w-full px-32 pt-48 flex justify-between items-center md:hidden">
                        <div className="w-[72px] h-[52px]">
                            <Logo />
                        </div>


                        <button onClick={toggleMobileNav}>
                            <span className="sr-only">Close</span>

                            <Close />
                        </button>
                    </div>

                    <nav className="w-full md:w-[330px]">
                        <ul className="uppercase md:flex md:items-center md:justify-between">
                            {links.map(({ url, label }) => (
                                <li key={url} className="mdd:my-48 mdd:mx-8">
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
                </div>
            </div>
        </header>
    )
}

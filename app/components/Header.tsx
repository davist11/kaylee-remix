import { Link } from "@remix-run/react";
import { useState } from "react";
import { Transition } from '@headlessui/react'

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
        setIsOpen(!isOpen)
    }

    return (
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

                    <span className="block w-[35px] h-[42px]">
                        <Menu />
                    </span>
                </button>

                <Transition
                    show={isOpen}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="md:hidden fixed inset-0 bg-white z-3 flex items-center text-center text-lg"
                >
                    <div className="absolute top-0 left-0 w-full px-32 pt-48 flex justify-between items-center">
                        <Link to="/" className="block w-[72px] h-[52px]">
                            <span className="sr-only">Kaylee Davis</span>

                            <Logo />
                        </Link>

                        <button onClick={toggleMobileNav} className="w-[42px] h-[42px] stroke-black">
                            <span className="sr-only">Close</span>

                            <Close />
                        </button>
                    </div>

                    <nav className="w-full">
                        <ul className="uppercase">
                            {links.map(({ url, label }) => (
                                <li key={url} className="my-48 mx-8">
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
                </Transition>
            </div>
        </header>
    )
}

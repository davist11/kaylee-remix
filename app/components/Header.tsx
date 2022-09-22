import { Link } from "@remix-run/react";

import Logo from '~/components/svgs/Logo'

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
    return (
        // TODO update vertical padding
        <header className="max-w-1340 mx-auto px-32 pt-48 pb-64">
            <div className="flex justify-between items-center">
                <Link to="/" className="block">
                    <span className="sr-only">Kaylee Davis</span>

                    <div className="w-[120px] h-[88px]">
                        <Logo />
                    </div>
                </Link>

                <nav className="w-[330px]">
                    <ul className="flex items-center justify-between uppercase">
                        {links.map(({ url, label }) => (
                            <li key={url}>
                                <Link to={url} className="transition-all hover:font-bold">{label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

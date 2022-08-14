import { Link } from "@remix-run/react";

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
        <header className="max-w-1340 mx-auto px-32 py-16">
            <div className="flex justify-between items-center">
                <Link to="/">Kaylee Davis</Link>

                <nav>
                    <ul className="flex uppercase">
                        {links.map(({ url, label }) => (
                            <li key={url} className="mx-16">
                                <Link to={url}>{label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

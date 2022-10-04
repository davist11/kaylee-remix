import type { MetaFunction, LinksFunction } from '@remix-run/node'
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useCatch,
} from '@remix-run/react'

import styles from './tailwind.css'

import SkipLink from './components/SkipLink'
import Header from './components/Header'
import Footer from './components/Footer'
import Error from './components/Error'

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Kaylee Davis | Graphic Designer',
    viewport: 'width=device-width,initial-scale=1',
    'msapplication-TileColor': '#ffffff',
    'theme-color': '#ffffff',
})

export const links: LinksFunction = () => [
    {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
    },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
    },
    {
        rel: 'stylesheet',
        href: styles,
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600&display=swap',
    },
    {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
    },
    {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
    },
    {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
    },
    {
        rel: 'manifest',
        href: '/site.webmanifest',
    },
    {
        rel: `mask-icon`,
        href: '/safari-pinned-tab.svg',
        color: '#ffffff'
    },
]

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <SkipLink />

                <Header />

                <main
                    id="content"
                    role="main"
                    tabIndex={-1}
                    className="outline-none"
                >
                    <Outlet />
                </main>

                <Footer />

                <ScrollRestoration />
                <Scripts />

                {/* TODO only dev */}
                <LiveReload />
            </body>
        </html>
    )
}


// 404
export function CatchBoundary() {
    const caught = useCatch()

    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
                <title>{caught.statusText}</title>
            </head>
            <body>
                <SkipLink />

                <Header />

                <main
                    id="content"
                    role="main"
                    tabIndex={-1}
                    className="outline-none"
                >
                    <Error />
                </main>

                <Footer />

                <Scripts />
            </body>
        </html>
    )
}

// Uncaught exception
type ErrorBoundaryProps = {
    error: any;
}

export function ErrorBoundary({ error }: ErrorBoundaryProps) {
    console.error(error)

    const errorText = 'Whoops!'

    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
                <title>{errorText}</title>
            </head>
            <body>
                <SkipLink />

                <Header />

                <main
                    id="content"
                    role="main"
                    tabIndex={-1}
                    className="outline-none"
                >
                    <div className="max-w-1340 mx-auto px-32">
                        Error: {errorText}
                    </div>
                </main>

                <Footer />

                <Scripts />
            </body>
        </html>
    )
}

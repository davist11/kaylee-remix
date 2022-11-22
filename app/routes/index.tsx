import { json } from '@remix-run/node'
import type { MetaFunction, LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData, useLocation } from '@remix-run/react'

import { useContentful } from '~/hooks/use-contentful'
import { GET_HOMEPAGE } from '~/graphql/homepage'

import Image from '~/components/Image'

type Project = {
    title: string;
    slug: string;
    previewImage: {
        url: string;
    }
}

type Entry = {
    title: string
    projectsCollection: {
        items: Project[];
    }
}

export const meta: MetaFunction = () => ({
    description: `Kaylee Davis’ portfolio. Layout design, logo creation, hero imagery, and photography.`,
    'og:image': `https://images.ctfassets.net/ku95fq526puv/7IB2EKl8C2nHJV0TxOI8Q7/d0878aaf5c9c697d890bbe5ef4f01d99/default.png`,
})

export const loader: LoaderFunction = async ({ request, params }) => {
    const {
        homepageCollection: { items },
    } = await useContentful({
        request,
        query: GET_HOMEPAGE,
        variables: {
            slug: params.slug,
        },
    })

    return json({ entry: items[0] })
}

export default function Index() {
    const { entry }: { entry: Entry } = useLoaderData()
    const {title, projectsCollection: {items: projects}} = entry;

    return (
        <div>
            <h1 className="sr-only">{title}</h1>

            <div className="max-w-1340 mx-auto px-32">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
                    {projects.filter(item => item.previewImage !== null).map(({ title, slug, previewImage }) => {
                        const imageUrl = previewImage?.url

                        return (
                            <li key={slug}>
                                <Link to={`/design/${slug}`} className="block relative overflow-hidden group">
                                    <Image url={imageUrl} alt="" width={830} height={530} />

                                    <div className="absolute top-0 left-0 h-full w-full bg-black/50 text-white font-semibold flex items-center justify-center text-lg p-16 text-center transition-opacity opacity-0 group-hover:opacity-100">
                                        {title}
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

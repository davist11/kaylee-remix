import { json } from '@remix-run/node'
import type { MetaFunction, LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

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

// export const meta: MetaFunction = () => ({
//     description: 'TODO',
//     'og:image': 'TODO',
// })

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
                                <Link to={`/design/${slug}`} className="block">
                                    <Image url={imageUrl} alt={title} width={830} height={530} />
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

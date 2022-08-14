import { json } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { useContentful } from '~/hooks/use-contentful'
import { GET_PHOTOGRAPHY } from '~/graphql/photography'

import Image from '~/components/Image'

type Asset = {
    url: string;
    title: string;
}

type LoaderDataReturn = {
    entry: {
        title: string
        imagesCollection: {
            items: Asset[]
        }
    }
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const {
        photographyCollection: { items },
    } = await useContentful({
        request,
        query: GET_PHOTOGRAPHY,
    })

    return json({ entry: items[0] })
}

export default function DesignEntry() {
    const { entry }: LoaderDataReturn = useLoaderData()
    const {
        title,
        imagesCollection: { items: images },
    } = entry

    return (
        <div className="max-w-1340 mx-auto px-32">
            <h1 className="sr-only">{title}</h1>

            <div className="columns-2">
                {images.map(({ url, title }) => (
                    <div key={url} className="mb-64">
                        <Image url={url} alt={title} width={600} />
                    </div>
                ))}
            </div>
        </div>
    )
}

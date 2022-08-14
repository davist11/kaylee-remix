import { json } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'

import { useContentful } from '~/hooks/use-contentful'
import { GET_ABOUT } from '~/graphql/about'

import Image from '~/components/Image'

type LoaderDataReturn = {
    entry: {
        title: string;
        image: {
            url: string;
        }
        content: {
            json: Document
        }
    }
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const {
        aboutCollection: { items },
    } = await useContentful({
        request,
        query: GET_ABOUT,
    })

    return json({ entry: items[0] })
}

export default function DesignEntry() {
    const { entry }: LoaderDataReturn = useLoaderData()
    const {
        title,
        image,
        content
    } = entry

    const imageUrl = image?.url

    return (
        <div>
            <h1>{title}</h1>

            {imageUrl ? <Image url={imageUrl} /> : null}

            {content ? (
                <div className="rich-text">
                    {documentToReactComponents(content.json)}
                </div>
            ) : null}
        </div>
    )
}

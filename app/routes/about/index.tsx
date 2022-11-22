import { json } from '@remix-run/node'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document, INLINES } from '@contentful/rich-text-types'

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

export const meta: MetaFunction = ({ data }) => ({
    title: 'About Me | Kaylee Davis | Graphic Designer',
    description: `Hi, I’m Kaylee. I started creating at an early age and found my love of graphic design in high school. See my work, photography, and contact me via LinkedIn or email for inquiries.`,
    'og:image': data?.entry?.image?.url,
})

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
        <div className="max-w-1340 mx-auto px-32 md:flex md:flex-row-reverse">
            <div className="mb-64 md:mb-0 md:w-1/2 md:pl-32">
                <h1 className="text-lg font-semibold mb-16">{title}</h1>

                {content ? (
                    <div className="rich-text">
                        {documentToReactComponents(content.json, {
                            renderNode: {
                                [INLINES.HYPERLINK]: (node, children) => {
                                    const isExternalLink = node.data.uri.startsWith('http') && !node.data.uri.includes('kaylee-davis.com')

                                    const anchorAttrs = isExternalLink ? {
                                        target: '_blank',
                                        rel: 'noopener noreferrer',
                                    } : {}

                                    return (
                                        <a
                                            href={node.data.uri}
                                            {...anchorAttrs}
                                        >
                                            {children}
                                        </a>
                                    )
                                },
                            },
                        })}
                    </div>
                ) : null}
            </div>

            {imageUrl ? (
                <div className="md:w-1/2">
                    <Image
                        url={imageUrl}
                        alt="Photo of Kaylee Davis"
                        width={1276}
                    />
                </div>
            ) : null}
        </div>
    )
}

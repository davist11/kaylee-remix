import { json } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { useContentful } from '~/hooks/use-contentful'
import { GET_PHOTOGRAPHY } from '~/graphql/photography'

import Image from '~/components/Image'
import { useState } from 'react'

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
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [activeImage, setActiveImage] = useState(null)

    const handleClick = (e: any, index: number) => {
        e.preventDefault()

        // TODO setup focus trap
        setModalIsOpen(true)
        setActiveImage(images[index])
    }

    const handleClose = () => {
        // TODO return focus
        setModalIsOpen(false)
        setActiveImage(null)
    }

    return (
        <div className="max-w-1340 mx-auto px-32">
            <h1 className="sr-only">{title}</h1>

            <div className="columns-2">
                {images.map(({ url, title }, index) => (
                    <a
                        href={url}
                        key={url}
                        className="block mb-64"
                        onClick={(e) => handleClick(e, index)}
                    >
                        <Image url={url} alt={title} width={600} />
                    </a>
                ))}
            </div>

            {modalIsOpen && activeImage && (
                <div className="fixed top-0 left-0 h-screen w-screen bg-black/75">
                    <div className="absolute top-0 left-0 h-full w-full">
                        {/* TODO add loader */}
                        <Image
                            url={activeImage.url}
                            alt={activeImage.title}
                            className="h-full object-contain mx-auto"
                        />

                        {/* TODO add previous and next buttons */}

                        <button onClick={handleClose} className="bg-pink absolute top-0 right-0">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

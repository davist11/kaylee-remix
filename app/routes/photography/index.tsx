import { json } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { useContentful } from '~/hooks/use-contentful'
import { GET_PHOTOGRAPHY } from '~/graphql/photography'

import Image from '~/components/Image'
import { useState } from 'react'
import Loader from '~/components/Loader'
import FocusTrap from 'focus-trap-react'

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
    const [activeIndex, setActiveIndex] = useState<number|null>(null)

    const handleClick = (e: any, index: number) => {
        e.preventDefault()

        setModalIsOpen(true)
        setActiveIndex(index)
    }

    const handleClose = () => {
        // TODO esc to close
        setModalIsOpen(false)
        setActiveIndex(null)
    }

    const handlePrevious = () => {
        // TODO arrows to navigate?
        if (activeIndex === null) return

        setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1)
    }

    const handleNext = () => {
        // TODO arrows to navigate?
        if (activeIndex === null) return

        setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1)
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

            {modalIsOpen && activeIndex !== null && (
                <FocusTrap>
                    <div className="fixed top-0 left-0 h-screen w-screen bg-black/75">
                        <div className="absolute flex items-center justify-center top-0 left-0 h-full w-full">
                            <div className="absolute z-1 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                                <Loader />
                            </div>

                            <div className="h-full relative z-2">
                                <Image
                                    url={images[activeIndex].url}
                                    alt={images[activeIndex].title}
                                    className="h-full object-contain"
                                />
                            </div>

                            <button
                                onClick={handlePrevious}
                                className="bg-pink absolute top-1/2 -translate-y-1/2 left-0 z-3"
                            >
                                Previous
                            </button>

                            <button
                                onClick={handleNext}
                                className="bg-pink absolute top-1/2 -translate-y-1/2 right-0 z-3"
                            >
                                Next
                            </button>

                            <button
                                onClick={handleClose}
                                className="bg-pink absolute top-0 right-0 z-3"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </FocusTrap>
            )}
        </div>
    )
}

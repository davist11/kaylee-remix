import { json } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import FocusTrap from 'focus-trap-react'

import { useContentful } from '~/hooks/use-contentful'
import { GET_PHOTOGRAPHY } from '~/graphql/photography'

import Image from '~/components/Image'
import Loader from '~/components/Loader'
import Close from '~/components/svgs/Close'
import Caret from '~/components/svgs/Caret'

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

            <div className="lg:columns-2">
                {images.map(({ url, title }, index) => (
                    <a
                        href={url}
                        key={url}
                        className="block mb-32 lg:mb-64"
                        onClick={(e) => handleClick(e, index)}
                    >
                        <Image url={url} alt={title} width={1000} />
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
                                className="absolute top-1/2 -translate-y-1/2 left-16 z-3 w-[12px] h-[21px] lg:w-[24px] lg:h-[42px] stroke-white"
                            >
                                <span className="sr-only">Previous</span>

                                <Caret />
                            </button>

                            <button
                                onClick={handleNext}
                                className="absolute top-1/2 -translate-y-1/2 right-16 z-3 w-[12px] h-[21px] lg:w-[24px] lg:h-[42px] stroke-white rotate-180"
                            >
                                <span className="sr-only">Next</span>

                                <Caret />
                            </button>

                            <button
                                onClick={handleClose}
                                className="absolute top-16 right-16 z-3 w-[28px] h-[28px] lg:w-[46px] lg:h-[46px] stroke-white"
                            >
                                <span className="sr-only">Close</span>

                                <Close />
                            </button>
                        </div>
                    </div>
                </FocusTrap>
            )}
        </div>
    )
}

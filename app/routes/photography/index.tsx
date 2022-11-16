import { json } from '@remix-run/node'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import FocusTrap from 'focus-trap-react'
import cx from 'classnames'

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

export const meta: MetaFunction = () => ({
    title: 'Photography | Kaylee Davis | Graphic Designer',
    description: `Outside of design, I enjoy taking sports, travel, and portrait photography. See my photography portfolio here.`,
    'og:image': 'https://images.ctfassets.net/ku95fq526puv/3qz1sDxmgaCjJBS3PTiXbG/86b93d7d039eef6dc6fb3f45bcb9b9ae/photography.jpg',
})

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
    const [isLoadingImage, setIsLoadingImage] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number|null>(null)

    useEffect(() => {
        if (modalIsOpen) {
            window.addEventListener('keydown', handleKeyDown)
        } else {
            window.removeEventListener('keydown', handleKeyDown)
        }

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [modalIsOpen])

    const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'Escape':
                handleClose()
                break

            case 'ArrowLeft':
                handlePrevious()
                break

            case 'ArrowRight':
                handleNext()
                break
        }
    }

    const handleClick = (e: any, index: number) => {
        e.preventDefault()

        setModalIsOpen(true)
        setIsLoadingImage(true)
        setActiveIndex(index)
    }

    const handleClose = () => {
        setModalIsOpen(false)
        setIsLoadingImage(false)
        setActiveIndex(null)
    }

    const handlePrevious = () => {
        if (activeIndex === null) return

        setIsLoadingImage(true)
        setActiveIndex((prevActiveIndex) => (prevActiveIndex === 0 || prevActiveIndex === null) ? images.length - 1 : prevActiveIndex - 1)
    }

    const handleNext = () => {
        if (activeIndex === null) return

        setIsLoadingImage(true)
        setActiveIndex((prevActiveIndex) =>
            (prevActiveIndex === images.length - 1 || prevActiveIndex === null)
                ? 0
                : prevActiveIndex + 1
        )
    }

    const handleImageLoaded = () => {
        setIsLoadingImage(false)
    }

    return (
        <div className="max-w-1340 mx-auto px-32">
            <h1 className="sr-only">{title}</h1>

            <div className="lg:columns-2">
                {images.map(({ url, title }, index) => (
                    <a
                        href={url}
                        key={url}
                        className="block mb-32 lg:mb-16 relative overflow-hidden group"
                        onClick={(e) => handleClick(e, index)}
                    >
                        <Image url={url} alt={title} width={1000} />

                        <div className="absolute top-0 left-0 h-full w-full bg-black/50 transition-opacity opacity-0 group-hover:opacity-100"></div>
                    </a>
                ))}
            </div>

            {modalIsOpen && activeIndex !== null && (
                <FocusTrap>
                    <div className="fixed z-2 top-0 left-0 h-screen w-screen bg-black/75">
                        <div className="absolute flex items-center justify-center top-0 left-0 h-full w-full">
                            {isLoadingImage ? (
                                <div className="absolute z-1 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                                    <Loader />
                                </div>
                            ) : null}

                            <div className="h-full relative z-2">
                                <Image
                                    url={images[activeIndex].url}
                                    alt={images[activeIndex].title}
                                    className={cx(
                                        'h-full object-contain transition-opacity',
                                        {
                                            'opacity-0': isLoadingImage,
                                        }
                                    )}
                                    handleLoad={handleImageLoaded}
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
                                className="absolute top-16 right-16 z-3 w-[21px] h-[21px] lg:w-[42px] lg:h-[42px] stroke-white"
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

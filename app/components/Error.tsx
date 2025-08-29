const images = [
    '/images/error/error-balls.jpg',
    '/images/error/error-broken.jpg',
]

type ErrorProps = {
    imageIndex?: number
}

export default function Error({ imageIndex = 0 }: ErrorProps) {
    const imageToDisplay = images[imageIndex]

    return (
        <div className="max-w-1340 mx-auto px-32">
            <h1 className="sr-only">Page Not Found</h1>
            <img src={imageToDisplay} alt="" className="mx-auto" />
        </div>
    )
}

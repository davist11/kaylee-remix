const images = [
    '/images/error/error-balls.jpg',
    '/images/error/error-broken.jpg',
]

export default function Error() {
    const imageToDisplay = images[Math.floor(Math.random() * images.length)]

    return (
        <div className="max-w-1340 mx-auto px-32">
            <h1 className="sr-only">Page Not Found</h1>
            <img src={imageToDisplay} alt="" className="mx-auto" />
        </div>
    )
}

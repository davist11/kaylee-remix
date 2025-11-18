import cx from 'classnames'

type ImageProps = {
    url: string
    alt?: string
    width?: number
    height?: number
    className?: string
    handleLoad?: () => void
}

export default function Image({
    url,
    alt,
    width,
    height,
    className,
    handleLoad,
}: ImageProps) {
    return (
        <img
            src={url}
            width={width}
            height={height}
            className={cx('bg-black/10', className)}
            alt={alt}
            onLoad={handleLoad}
            loading="lazy"
        />
    )
}

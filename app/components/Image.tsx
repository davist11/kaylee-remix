import Imgix from 'react-imgix'
import cx from 'classnames'
import { useState } from 'react'

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
    const [isLoaded, setIsLoaded] = useState(false)

    const src = url.replace(
        'https://images.ctfassets.net/ku95fq526puv/',
        'https://kayleedavis.imgix.net/'
    )

    const onLoad = () => {
        setIsLoaded(true)

        if (typeof handleLoad === 'function') {
            handleLoad()
        }
    }

    return (
        <Imgix
            src={src}
            width={width}
            height={height}
            className={cx(className, {
                'bg-black/10': !isLoaded,
            })}
            imgixParams={{
                auto: 'format',
                fit: 'crop',
            }}
            htmlAttributes={{ alt, onLoad }}
        />
    )
}

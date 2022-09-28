import Imgix from "react-imgix"
import cx from "classnames"

type ImageProps = {
    url: string
    alt?: string
    width?: number
    height?: number
    className?: string
}
export default function Image({ url, alt, width, height, className }: ImageProps) {
    const src = url.replace(
        'https://images.ctfassets.net/ku95fq526puv/',
        'https://kaylee-davis.imgix.net/'
    )

    return (
        <Imgix
            src={src}
            width={width}
            height={height}
            className={cx(className, 'bg-black/10')}
            imgixParams={{
                auto: 'format',
                fit: 'crop',
            }}
            htmlAttributes={{ alt }}
        />
    )
}

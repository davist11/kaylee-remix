import Imgix from "react-imgix"

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
            imgixParams={{
                auto: 'format',
                fit: 'crop',
            }}
            htmlAttributes={{ alt, class: className }}
        />
    )
}

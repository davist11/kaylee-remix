import { useEffect, useState } from "react";
import cx from "classnames";

import Caret from '~/components/svgs/Caret'

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    };

    useEffect(() => {
        const onScroll = () => {
            setIsVisible(document.documentElement.scrollTop >= 300)
        }

        onScroll()
        document.addEventListener('scroll', onScroll)

        return () => document.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <button
            className={cx(
                'fixed z-1 bottom-16 right-16 transition-all w-48 h-48 bg-black hover:bg-black/50 rounded-full stroke-white rotate-90 flex items-center justify-center',
                {
                    'opacity-0 invisible': !isVisible,
                    'opacity-100 visible': isVisible,
                }
            )}
            onClick={scrollUp}
        >
            <span className="sr-only">Scroll to top</span>
            <span className="block  w-[12px] h-[21px]">
                <Caret />
            </span>
        </button>
    )
}

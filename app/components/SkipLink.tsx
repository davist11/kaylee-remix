export default function SkipLink() {
    return (
        <div className="absolute top-0 left-0">
            <a
                href="#content"
                className="sr-only focus:not-sr-only block !p-8 bg-black text-white"
            >
                Skip to Content
            </a>
        </div>
    )
}

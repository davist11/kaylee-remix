import { json } from '@remix-run/node'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { Document } from '@contentful/rich-text-types'

import { queryContentful } from '~/lib/contentful.server'
import { getProjectList } from '~/lib/project-list.server'
import { useSummary } from '~/hooks/use-summary'
import { GET_PROJECT } from '~/graphql/projects'

import Image from '~/components/Image'
import Caret from '~/components/svgs/Caret'

type Project = {
    url: string
    title: string
    slug: string
}

type Asset = {
    url: string
    title: string
}

type LoaderDataReturn = {
    entry: {
        title: string
        description: {
            json: Document
        }
        previewImage: {
            url: string
        }
        imagesCollection: {
            images: Asset[]
        }
    }
    description: string | null
    nextProject: Project
}

export const meta: MetaFunction = ({ data }) => {
    if (!data?.entry) {
        return {
            title: 'Design | Kaylee Davis | Graphic Designer',
        }
    }

    const { entry, description } = data

    return {
        title: `${entry.title} | Kaylee Davis | Graphic Designer`,
        description,
        'og:image': entry?.previewImage?.url ?? '',
    }
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const {
        projectCollection: { items },
    } = await queryContentful({
        request,
        query: GET_PROJECT,
        variables: {
            slug: params.slug,
        },
    })

    const projects: Project[] = await getProjectList(request)

    const currentProjectIndex = projects.findIndex(
        (project) => project.slug === params.slug
    )

    const getNextProject = () => {
        let nextIndex = currentProjectIndex + 1

        if (nextIndex === projects.length) {
            nextIndex = 0
        }

        return projects[nextIndex]
    }

    const entry = items[0]
    const description = entry?.description?.json
        ? useSummary(documentToHtmlString(entry.description.json), 160)
        : null

    return json({
        entry,
        description,
        nextProject: getNextProject(),
    })
}

export default function DesignEntry() {
    const { entry, nextProject }: LoaderDataReturn = useLoaderData()
    const {
        title,
        description,
        imagesCollection: { images },
    } = entry

    return (
        <div className="max-w-1340 mx-auto px-32 lg:flex lg:flex-row-reverse">
            <div className="mb-64 lg:mb-0 lg:w-1/3 lg:pl-32">
                <h1 className="text-lg font-semibold mb-16">{title}</h1>

                {description ? (
                    <div className="rich-text text-md font-light">
                        {documentToReactComponents(description.json)}
                    </div>
                ) : null}

                <div className="flex items-center justify-between mt-48 font-semibold">
                    <Link to="/" className="flex items-center pr-8">
                        <span className="mr-8 w-[12px] h-[21px] stroke-black">
                            <Caret />
                        </span>
                        <span>All Projects</span>
                    </Link>

                    <Link
                        to={nextProject.url}
                        className="flex items-center pl-8 text-right"
                    >
                        <span>{nextProject.title}</span>

                        <span className="ml-8 rotate-180 w-[12px] h-[21px] stroke-black">
                            <Caret />
                        </span>
                    </Link>
                </div>
            </div>

            <div className="lg:w-2/3">
                {images.map(({ url, title }) => (
                    <div key={url} className="mb-24">
                        <Image url={url} alt={title} width={1024} />
                    </div>
                ))}
            </div>
        </div>
    )
}

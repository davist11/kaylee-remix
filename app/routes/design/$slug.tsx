import { json } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'

import { useContentful } from "~/hooks/use-contentful"
import { useProjectList } from '~/hooks/use-project-list'
import { GET_PROJECT } from "~/graphql/projects"

import Image from '~/components/Image'
import Caret from '~/components/svgs/Caret'

type Project = {
    url: string;
    title: string;
    slug: string;
};

type Asset = {
    url: string;
    title: string;
}

type LoaderDataReturn = {
    entry: {
        title: string
        description: {
            json: Document
        }
        imagesCollection: {
            images: Asset[]
        }
    }
    nextProject: Project
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const {
        projectCollection: { items },
    } = await useContentful({
        request,
        query: GET_PROJECT,
        variables: {
            slug: params.slug,
        },
    })

    const projects: Project[] = await useProjectList(request).then(
        (data) => data
    )

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

    return json({ entry: items[0], nextProject: getNextProject() })
}

export default function DesignEntry() {
    const { entry, nextProject }: LoaderDataReturn = useLoaderData()
    const { title, description, imagesCollection: {images} } = entry

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
                        <span className="mr-8 w-[12px] h-[21px]">
                            <Caret />
                        </span>
                        <span>All Projects</span>
                    </Link>

                    <Link
                        to={nextProject.url}
                        className="flex items-center pl-8 text-right"
                    >
                        <span>{nextProject.title}</span>

                        <span className="ml-8 rotate-180  w-[12px] h-[21px]">
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

import { GraphQLClient } from 'graphql-request'

const isPreview = (request: Request): boolean =>
    new URL(request.url).searchParams.has('preview')

export async function getContentfulClient(request: Request) {
    const isPreviewRequest = isPreview(request)
    const authToken = isPreviewRequest
        ? process.env.CONTENTFUL_PREVIEW_TOKEN
        : process.env.CONTENTFUL_TOKEN

    const client = new GraphQLClient(
        `https://graphql.contentful.com/content/v1/spaces/ku95fq526puv`,
        {
            headers: {
                authorization: `Bearer ${authToken}`,
            },
        }
    )

    return client
}

export async function queryContentful({
    query,
    request,
    variables = {},
}: {
    query: string
    request: Request
    variables?: any
}): Promise<any> {
    const client = await getContentfulClient(request)
    const isPreviewRequest = isPreview(request)

    return client.request(query, {
        ...variables,
        preview: isPreviewRequest,
    })
}

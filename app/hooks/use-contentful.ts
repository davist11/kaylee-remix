import { useGqlClient } from "./use-gql-client";

type UseContentfulProps = {
    query: string;
    request: Request;
    // TODO update to object
    variables?: any;
}

const isPreview = (request: Request): boolean => new URL(request.url).searchParams.has('preview')

export async function useContentful({
    query,
    request,
    variables = {}
}: UseContentfulProps): Promise<any> {
    const isPreviewRequest = isPreview(request)
    const authToken = isPreviewRequest ? process.env.CONTENTFUL_PREVIEW_TOKEN : process.env.CONTENTFUL_TOKEN

    const client = useGqlClient(authToken)

    return client.request(query, {
        ...variables,
        preview: isPreviewRequest,
    })
}

import { GraphQLClient } from "graphql-request";

export function useGqlClient(authToken: string) {
    return new GraphQLClient(`https://graphql.contentful.com/content/v1/spaces/ku95fq526puv`, {
        headers: {
            authorization: `Bearer ${authToken}`,
        },
    })
}

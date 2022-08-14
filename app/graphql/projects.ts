import { gql } from 'graphql-request'

export const GET_PROJECT = gql`
    query GetProject($slug: String!, $preview: Boolean) {
        projectCollection(limit: 1, where: { slug: $slug }, preview: $preview) {
            items {
                title
                description {
                    json
                }
                imagesCollection {
                    images: items {
                        url
                        title
                    }
                }
            }
        }
    }
`

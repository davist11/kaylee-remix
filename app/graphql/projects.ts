import { gql } from 'graphql-request'

export const GET_PROJECT = gql`
    query GetProject($slug: String!, $preview: Boolean) {
        projectCollection(limit: 1, where: { slug: $slug }, preview: $preview) {
            items {
                title
                description {
                    json
                }
                previewImage {
                    url(transform: { width: 1024, resizeStrategy: FILL })
                }
                imagesCollection {
                    images: items {
                        url(
                            transform: {
                                width: 1024
                                resizeStrategy: FILL
                                format: WEBP
                            }
                        )
                        title
                    }
                }
            }
        }
    }
`

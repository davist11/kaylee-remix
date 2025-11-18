import { gql } from 'graphql-request'

export const GET_PHOTOGRAPHY = gql`
    query GetPhotography {
        photographyCollection(limit: 1) {
            items {
                title
                imagesCollection {
                    items {
                        title
                        url
                        resizedUrl: url(
                            transform: {
                                width: 1000
                                resizeStrategy: FILL
                                format: WEBP
                            }
                        )
                    }
                }
            }
        }
    }
`

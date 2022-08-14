import { gql } from 'graphql-request'

export const GET_HOMEPAGE = gql`
    query GetHomepage {
        homepageCollection(limit: 1) {
            items {
                title,
                projectsCollection {
                    items {
                        title,
                        slug,
                        previewImage {
                            url
                        }
                    }
                }
            }
        }
    }
`

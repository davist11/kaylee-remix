import { gql } from 'graphql-request'

export const GET_ABOUT = gql`
    query GetAbout {
        aboutCollection(limit: 1) {
            items {
                title
                image {
                    url
                }
                content {
                    json
                }
            }
        }
    }
`

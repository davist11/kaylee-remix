import { GET_HOMEPAGE } from '~/graphql/homepage'
import { queryContentful } from '~/lib/contentful.server'

export async function getProjectList(request: Request): Promise<any> {
    const {
        homepageCollection: { items: homepageItems },
    } = await queryContentful({
        request,
        query: GET_HOMEPAGE,
    })

    const {
        projectsCollection: { items },
    } = homepageItems[0]

    return items.map((item: any) => ({
        title: item.title,
        url: `/design/${item.slug}`,
        slug: item.slug,
    }))
}

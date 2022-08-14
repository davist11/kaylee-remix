import { GET_HOMEPAGE } from "~/graphql/homepage";
import { useContentful } from "./use-contentful";

export async function useProjectList(request: Request): Promise<any> {
    const {
         homepageCollection: { items: homepageItems },
     } = await useContentful({
         request,
         query: GET_HOMEPAGE,
     })

     const { projectsCollection: { items } } = homepageItems[0];

    return items.map((item: any) => ({
        title: item.title,
        url: `/design/${item.slug}`,
        slug: item.slug,
    }))
}

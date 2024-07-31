import {client} from "@/lib/elasticsearch";
import {AllArticles} from "@/components/AllArticles";

export const getArticles = async (limit, page, locale)=> {

  const from = (Number(page) -1) * Number(limit);

  const articles = await client.search({
    body: {
      query: {
        bool: {
          must: [
            { match: { "translations.locale": locale } }
          ]
        }
      },
      size: limit,
      from,
      sort: [
        { "translations.published_at": {"order": "desc", "format": "strict_date_optional_time_nanos"} }
      ]
    }
  })
  const hits = articles.hits.hits.map(hit => hit._source);
  const total = articles.hits.total.value;
  return {
    hits,
    total
  }

}

export default async function Page({ params: {locale}, searchParams }) {

  const {page, limit} = searchParams;
  const data = await getArticles(limit,page, locale)


  const {hits, total} = data
  const totalPages = Math.ceil(total / limit)

  return <>
    {data && <div className="xl:container md:mx-6 "><AllArticles articles={hits} total={total} totalPages={totalPages} page={page}/></div>}
  </>
}
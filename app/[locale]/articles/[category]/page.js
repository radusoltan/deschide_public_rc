import {Articles} from "@/components/Category/Articles";
import {client} from "@/lib/elasticsearch";
import axios from "axios";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";
import add_img from "@/public/img/ads/250.jpg"

const getCategory = async ({locale, category, page, limit}) => {

  const from = (Number(page) -1) * Number(limit)

  const data = await axios.get(process.env.NEXT_PUBLIC_API_URL +`/api/public/categories/${category}?locale=${locale}`)

  const articles = await client.search({
    index: "articles",
    body: {
      query: {
        bool: {
          must: [
            { match: { "translations.locale": locale} },
            { match: { "category.translations.slug": category } }
          ]
        }
      },
      from,
      size: Number(limit),
      sort: [
        { "translations.published_at": {"order": "desc", "format": "strict_date_optional_time_nanos"} }
      ]
    }
  })
  const popularArticles = await client.search({
    index: "articles",
    body: {
      query: {
        bool: {
          must: [
            { match: { "translations.locale": locale} },
            { match: { "category.translations.slug": category } }
          ]
        }
      },
      from: 0,
      size: 5,
      sort: [
        { "visits": {"order": "desc"} }
      ]
    }
  })
  return {
    total: articles.hits.total.value,
    category: data?.data,
    articles: articles.hits.hits.map(hit => hit._source),
    popular: popularArticles.hits.hits.map(hit => hit._source),
  };

}

export default async function Page({ params: {locale, category}, searchParams }) {

  const {page=1, limit=15} = searchParams

  const {
    articles,
    popular,
    category: categoryData,
    total
  } = await getCategory({locale, category, page, limit})

  const totalPages = Math.ceil(total / limit)

  return <div className="bg-gray-50 py-6">
    <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
      <div className="flex flex-row flex-wrap">
        {/* LEFT */}
        <div className="flex-shrink max-w-full w-full lg:w-2/3  overflow-hidden order-first">
          <div className="w-full py-3">
            <h2 className="text-gray-800 text-2xl font-bold font-title">
              <span className="inline-block h-5 border-x-4 border-red-600 mr-2"></span>{categoryData?.data.title}
            </h2>
          </div>
          <Articles
              articles={articles}
              locale={locale}
              category={categoryData}
              totalPages={totalPages}
              limit={limit}
              page={page}
          />
        </div>
        <div className="flex-shrink max-w-full w-full lg:w-1/3 lg:pl-8 lg:pt-14 lg:pb-8 order-last">
          <div className="w-full bg-white border px-5 pt-5 rounded-lg">
            <div className="mb-6">
              <div className="w-full py-3">
                <h2 className="text-gray-800 text-lg font-bold font-category">
                  <span className="inline-block h-4 border-l-4 border-red-600 mr-2"></span>{
                  locale === "ro" ? "Cele mai deschise" :
                      locale === "ru" ? "Популярные Новости" :
                          "Popular News"
                }</h2></div>
              <ul className="post-number">{
                popular.map((article, index) => (

                    <li
                        className=" flex-row border-b border-gray-100 hover:bg-gray-50 font-title"
                        key={index}
                    >
                      <Link
                          href={`/${locale}/articles/${article.category.translations.find(t => t.locale === locale).slug}/${article.article_id}/${article.translations?.find(t => t.locale === locale)?.slug}`}
                          className="text-lg font-bold px-6 py-3 flex flex-row items-center"
                      >{
                        article?.translations.find(t => t.locale === locale).title
                      }</Link>
                      <div className="text-gray-500 text-sm lg:ml-16 ml-20 font-text">
                        {
                          moment(article?.translations.find(t => t.locale === locale).published_at).format("MM Do YYYY, h:mm")
                        }, <span className="font-light">views: {article?.visits}</span>
                      </div>
                    </li>
                ))
              }</ul>

            </div>
          </div>
          <div className="hidden text-sm py-6 sticky top-0">
            <div className="w-full text-center">
              <a className="uppercase" href="#">Advertisement</a>
              <a href="#">
                <Image className="mx-auto" src={add_img} alt="advertisement area"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}
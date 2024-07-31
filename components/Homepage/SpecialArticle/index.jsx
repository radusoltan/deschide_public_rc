"use client"
import {useParams} from "next/navigation";
import useWindowSize from "@/utils";
import {useArticles} from "@/services/articles";
import Link from "next/link";
import Image from "next/image";

export const SpecialArticle = () => {

  const {locale} = useParams()
  const {width} = useWindowSize()

  const {specialArticles, specialArticlesLoading} = useArticles({locale})

  return specialArticles?.length > 0 && <>

    {
      specialArticles?.map((article)=> {

        const {category, article_id, images, translations} = article._source
        const {is_breaking, is_alert, title, lead, body, slug} = translations.find(t=>t.locale === locale)

        const image = images.find(({is_main})=>is_main)
        const renditionId = width < 768 ? 1 : 2

        const thumbnail = image.thumbnails.find(t=>t.rendition_id===renditionId)


        return <div className="container max-w-7xl mx-auto mb-5" key={article_id}>
          <div className="relative rounded-lg block md:flex items-center bg-gray-100 shadow-xl h-56"
               style={{minHeight: "19em"}}>
            <div
                className="relative w-full md:w-3/5 h-full overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg"
                style={{minHeight: "19rem"}}>

              <Image
                  src={process.env.NEXT_PUBLIC_API_URL + '/' + thumbnail.path}
                  width={thumbnail.width}
                  height={thumbnail.height}
                  alt={title}
              />
              <div className="absolute top-0 text-blue-500 bg-amber-500">
                <span className={"bg-red-600 p-2 font-black font-category text-white top-2"}>
                  {
                    is_breaking ? "BREAKING NEWS" : is_alert ? "NEWS ALERT" : "FLASH"
                  }
                </span>
              </div>
              <div className="absolute inset-0 w-full top-2/3 h-1/3 bg-gradient-to-t from-red-600"></div>
              <div className="absolute inset-0 w-full h-2/3 top-36 -left-3 flex items-center justify-center fill-current text-white">
                <Link
                    href={`/${locale}/articles/${category.translations.find(t => t.locale === locale).slug}/${article_id}/${slug}`}>
                  <h1 className="text-white text-2xl md:text-md mx-7 font-title font-bold">{title}</h1>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-3/5 h-full flex items-center bg-gray-100 rounded-lg">
              <div className="p-12 md:pr-24 md:pl-16 md:py-12">
                <div className="text-gray-600 font-light font-text"
                     dangerouslySetInnerHTML={{
                       __html: lead ? lead.substring(0, 300) + " (...)" : body.substring(0, 300) + " (...)"
                     }}
                />
                <Link className="flex items-baseline mt-3 text-indigo-600 hover:text-indigo-900 focus:text-indigo-900"
                      href={`/${locale}/articles/${category.translations.find(t => t.locale === locale).slug}/${article_id}/${slug}`}>
                  <span>Deschide Stirea</span>
                  <span className="text-xs ml-1">&#x279c;</span>
                </Link>
              </div>
              <svg className="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-gray-100 -ml-12"
                   viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon points="50,0 100,0 50,100 0,100"/>
              </svg>
            </div>
          </div>
        </div>

      })
    }

  </>
}
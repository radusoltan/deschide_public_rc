"use client"
import moment from "moment";
import {useParams} from "next/navigation";
import {useArticles} from "@/services/articles";
import {LiveArticleSkeleton} from "@/components/Skeletons/LiveArticleSkeleton";

export const LiveArticle = () => {

  const {locale} = useParams()
  const {liveArticle, liveArticleLoading} = useArticles({locale})

  const article = liveArticle && liveArticle[0]

  const articleTranslated = article?._source.translations.find(t=>t.locale===locale)

  if (liveArticleLoading) return <LiveArticleSkeleton />

  return liveArticle && liveArticle?.length > 0 && <div className="max-w-7xl mx-auto px-3 sm:px-4 xl:px-2">
    <div className="flex flex-row flex-wrap">
      <div className="flex-shrink max-w-full w-full md:w-1/2 px-6 relative">
        <div className="absolute top-0 bg-red-600 text-white z-10 px-6">LIVE</div>

          <div className="aspect-w-16 aspect-h-9" dangerouslySetInnerHTML={{ __html: articleTranslated?.embed }} />

      </div>
      <div className="flex-shrink max-w-full w-full md:w-1/2 px-6">
        <h1 className="text-lg font-bold font-title">{articleTranslated?.title}</h1>
        <div className="text-gray-500 text-sm mt-7 font-text">{
          moment(articleTranslated?.published_at).format("MM Do YYYY, h:mm")
        }</div>
      </div>
    </div>
  </div>
}
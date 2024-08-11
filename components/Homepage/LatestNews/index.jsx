"use client"
import {useArticles} from "@/services/articles";
import {useParams} from "next/navigation";
import {ListSkeletons} from "@/components/Skeletons/ListSkeleton";
import { useTranslation } from 'react-i18next';
import {ArticleItem} from "@/components/Homepage/LatestNews/ArticleItem";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTelegram} from "@fortawesome/free-brands-svg-icons";

export const LastArticles = () => {
  const {locale} = useParams()
  const {lastArticles, lastArticlesLoading} = useArticles({locale})

  const {t} = useTranslation()

  if (lastArticlesLoading) return <ListSkeletons />

  return <div className="flex-shrink max-w-full w-full lg:w-1/3 lg:pr-8 order-first">
    <div className="w-full py-3">
      <h2 className="text-2xl font-bold mb-6">
        <span className="bg-red-600 p-3 rounded text-white">{t('lastNews')}</span>
      </h2>
    </div>
    <div className="w-full bg-white sticky top-1">

      {/*<div className="flex flex-row flex-wrap ">*/}
      {lastArticles?.articles.slice(0, 5).map(article => !article.is_video && <ArticleItem key={article._id}
                                                                      article={article._source}/>)}
      <div
          className="flex-shrink max-w-full w-full md:w-1/2 lg:w-full xl:w-full px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
        <a href="https://t.me/deschide_md">
          <div className="w-full flex-row shadow-sm border-b-2 items-center pb-6">
            <span className="text-blue-500 text-5xl"><FontAwesomeIcon icon={faTelegram}/></span>
            <span className="px-6 font-bold text-gray-500 font-text mt-0">
                  {t('follow')}
                </span>
          </div>
        </a>
      </div>
      {lastArticles?.articles.slice(5).map(article => !article.is_video && <ArticleItem key={article._id}
                                                                   article={article._source}/>)}

        <Link href={`/${locale}/articles/all?page=1&limit=15`} ><h1 className="text-center max-w-full w-full font-light text-gray-500 p-5 hover:bg-gray-300 hover:text-gray-500 mx-auto mb-6">{
          t('moreNews')
        }</h1></Link>

    </div>
  </div>
}
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

  return <div className="flex-shrink max-w-full w-full lg:w-1/3 lg:pr-8 lg:pb-10 order-first">
    <div className="w-full py-3">
      <h2 className="text-2xl font-bold mb-6">
        <span className="bg-red-600 p-3 rounded text-white">{t('lastNews')}</span>
      </h2>
    </div>
    <div className="w-full bg-white mr-6 sticky top-12">
      <div className="mb-6">
        <div className="flex flex-row flex-wrap -mx-3">
          {lastArticles?.articles.slice(0, 5).map(article => <ArticleItem key={article._id}
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
          {lastArticles?.articles.slice(5).map(article => <ArticleItem key={article._id}
                                                                          article={article._source}/>)}
          <span className="w-full mt-6"/>
          <Link href={`/${locale}/articles/all?page=1&limit=15`}
                className="w-full text-center font-light text-gray-500 p-5 hover:bg-gray-300 hover:text-gray-500 mx-auto mb-6">{
            t('moreNews')
          }</Link>
        </div>
      </div>
    </div>
  </div>
}
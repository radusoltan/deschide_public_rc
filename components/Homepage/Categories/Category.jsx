"use client"
import {useParams} from "next/navigation";
import {useTranslation} from "react-i18next";
import Link from "next/link";
import {ArticleItem} from "@/components/Homepage/Categories/ArticleItem";
import {PopularArticleItem} from "@/components/Homepage/Categories/PopularArticleItem";
import {useHomePageCategoryArticles} from "@/services/categories";

export const HomePageCategory = ({category}) => {
  const {locale} = useParams()
  const {t} = useTranslation()

  const {categoryArticles} = useHomePageCategoryArticles({locale,category: category.slug})

  return <div className="flex-shrink max-w-full w-full overflow-hidden py-3 ml-6">
    <div className="w-full pb-10">
      <Link href={`/${locale}/articles/${category.slug}`}>
        <h2 className="text-2xl font-bold font-category">
          <span className="bg-red-600 p-3 rounded text-white">{category.title}</span>
        </h2>
      </Link>
    </div>
    <div className="flex flex-row flex-wrap">
      <div className="w-full lg:w-2/3 md:w-1/2 pr-6">
        {categoryArticles?.articles.map((article, index) => <ArticleItem article={article} key={index}/>)}
      </div>
      <div className="hidden md:block lg:w-1/3 md:w-1/2 sm:hidden px-5 pt-5 border rounded-lg -mt-20">
        <div className="w-full py-3">
          <h2 className="text-gray-800 text-lg font-bold font-category">
            <span className="inline-block h-4 border-l-4 border-red-600 mr-2"></span>
            {t('popular')}
          </h2>
        </div>
        {
          categoryArticles?.popularArticles.map((article, index) => <PopularArticleItem article={article} key={index}/>)
        }
      </div>
      <span className="w-full border-b-2 mt-10"/>
      <Link href={`/${locale}/articles/${category.slug}?page=1&limit=15`}
            className="w-full text-center font-light text-gray-500 p-5 hover:bg-gray-300 hover:text-gray-500 mx-auto">
        {t('moreNews')}
      </Link>
    </div>
  </div>
}
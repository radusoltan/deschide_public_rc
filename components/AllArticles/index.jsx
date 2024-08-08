"use client"
import ReactPaginate from "react-paginate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleLeft, faCircleRight} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Link from "next/link";
import {useParams, useRouter} from "next/navigation";
import useWindowSize from "@/utils";
import Image from "next/image";
import {useTranslation} from "react-i18next";

export const AllArticles = ({articles, totalPages, page})=> {

  const router = useRouter();
  const {locale} = useParams()
  const { width } = useWindowSize();
  const {t} = useTranslation()

  const handlePageChange = (event) => {
    const page = event.selected + 1
    router.push(`/${locale}/articles/all?page=${page}&limit=12`)
  }


  return <div className="flex-shrink max-w-full w-full overflow-hidden">
    <div className="w-full py-3">
      <h2 className="text-gray-800 text-2xl font-bold font-title">
        <span className="inline-block h-5 border-l-4 border-red-600 mr-2"></span>{t('lastNews')}
      </h2>
    </div>
    <div className="flex flex-row flex-wrap -mx-3">

      {articles.map((article, index) => <div key={index}
                                             className="flex-shrink max-w-full w-full sm:w-1/3 lg:w-1/4 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
        <div className="flex flex-row sm:block hover-img">
          <Link href={`/${locale}/articles/${article.category.translations.find(t => t.locale === locale).slug}/${article.article_id}/${article.translations?.find(t=>t.locale===locale)?.slug}`}>
            {article.images.find(i => i.is_main) && <Image
                className="max-w-full w-full mx-auto"
                src={width < 768 ?
                    process.env.NEXT_PUBLIC_API_URL + '/' +
                    article.images.find(i => i.is_main)?.thumbnails.find(th => th.rendition_id === 2).path :
                    process.env.NEXT_PUBLIC_API_URL + '/' +
                    article.images.find(i => i.is_main)?.thumbnails.find(th => th.rendition_id === 1).path
                }
                width={width < 768 ?
                    article.images.find(i => i.is_main)?.thumbnails.find(th => th.rendition_id === 2).width :
                    article.images.find(i => i.is_main)?.thumbnails.find(th => th.rendition_id === 1).width
                }
                height={width < 768 ?
                    article.images.find(i => i.is_main)?.thumbnails.find(th => th.rendition_id === 2).height :
                    article.images.find(i => i.is_main)?.thumbnails.find(th => th.rendition_id === 2).height
                }
                alt={article.translations.find(t => t.locale === locale).title}/>}
            {/*<img className="max-w-full w-full mx-auto" src="/img/dummy/img19.jpg" alt="alt title"/>*/}
          </Link>
          <div className="py-0 sm:py-3 pl-3 sm:pl-0">
            <h3 className="text-lg font-bold leading-tight mb-2 font-title">
              <Link
                  href={`/${locale}/articles/${article.category.translations.find(t => t.locale === locale).slug}/${article.article_id}/${article.translations?.find(t => t.locale === locale)?.slug}`}>
                {article.translations.find(t => t.locale === locale)?.title}
              </Link>
            </h3>
            <div className="text-gray-500 text-sm mt-7 mb-5 font-text">{
              moment(article.translations.find(t => t.locale === locale).published_at)
                  .format("MM Do YYYY, h:mm")
            }</div>
            {/*<p*/}
            {/*    className="hidden md:block text-gray-600 leading-tight mb-1 font-text"*/}
            {/*    dangerouslySetInnerHTML={{__html:*/}
            {/*          article.translations.find(t=>t.locale===locale)?.lead ?*/}
            {/*              article.translations.find(t=>t.locale===locale)?.lead.substring(0,150) + '...' :*/}
            {/*              article.translations.find(t=>t.locale===locale)?.body.substring(0,150) + '...'*/}
            {/*    }}*/}
            {/*/>*/}
            <Link className="text-gray-500 font-category"
                  href={`/${locale}/articles/${article.category.translations.find(t => t.locale === locale).slug}`}><span
                className="inline-block h-3 border-l-2 border-red-600 mr-2"></span>{article.category.translations.find(t => t.locale === locale).title}
            </Link>
          </div>
        </div>
      </div>)}

    </div>

    <ReactPaginate
        onPageChange={handlePageChange}
        initialPage={page - 1}
        activeClassName="text-white bg-blue-500"
        pageCount={totalPages}
        breakLabel="..."
        nextLabel={<FontAwesomeIcon icon={faCircleRight}/>}
        pageRangeDisplayed={5}
        previousLabel={<FontAwesomeIcon icon={faCircleLeft}/>}
        containerClassName="inline-flex -space-x-px text-sm"
        pageClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        breakLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        previousClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        nextClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
    />

  </div>

}
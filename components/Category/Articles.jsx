"use client"
import {ArticleItem} from "@/components/Category/ArticleItem";
import {useRouter} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleLeft, faCircleRight} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";

export const Articles = ({articles, locale, category,totalPages, page, limit})=> {

  const router = useRouter();
  const handlePageChange = (event) => {
    const page = event.selected + 1

    router.push(`/${locale}/articles/${category.data.slug}?page=${page}&limit=${limit}`)
  }

  return <div className="flex flex-row flex-wrap -mx-3">


    {articles?.map((article, index) => <ArticleItem article={article} locale={locale} key={index}/>)}

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
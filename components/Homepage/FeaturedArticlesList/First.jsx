import Link from "next/link";
import Image from "next/image";
import {useParams} from "next/navigation";
import moment from "moment";
import 'moment/locale/ro'
import useWindowSize from "@/utils";

export const First = ({article})=>{
  const {locale} = useParams()
  const {width} = useWindowSize();

  const {article_id, translations, images, category} = article

  const {title, slug, published_at} = article.translations.find(t=>t.locale===locale)

  const articleLink = `/${locale}/articles/${category?.translations.find(t => t.locale === locale).slug}/${article_id}/${slug}`

  const image = images?.find(i=>i.is_main)

  const renditionId = width > 768 ? 1 : 2

  const thumbnail = image?.thumbnails.find(t=>t.rendition_id===renditionId)

  const articleImage = thumbnail && <Image
      src={process.env.NEXT_PUBLIC_API_URL + '/' + thumbnail.path}
      width={thumbnail.width}
      height={thumbnail.height}
      alt={title}
  />

  const publishedAt = moment(published_at)
  const oneHourAgo = moment().subtract(1,'hours')
  return <div className="flex-shrink max-w-full w-full lg:w-1/2 pb-1 lg:pb-0 lg:pr-1">
    <div className="hover-img max-h-98 overflow-hidden">
      <Link href={articleLink}>
        {articleImage}
      </Link>
      <div className="pt-8 pb-5 bottom-0 w-full">
        <Link
            href={`/${locale}/articles/${category?.translations.find(t => t.locale === locale).slug}/${article_id}/${translations?.find(t => t.locale === locale)?.slug}`}>
          {publishedAt.isAfter(oneHourAgo) && <span className="bg-red-600 text-white p-1">NEW</span>}
          <h2 className="text-3xl font-bold capitalize text-gray-700 mb-3 font-new">
            {title}
          </h2>
        </Link>
        <p className="text-gray-700 hidden sm:inline-block font-text"
           dangerouslySetInnerHTML={{__html: article.translations.find(t => t.locale === locale).body?.substring(0, 250) + ' ...'}}
        />
        <div className="pt-2">
          <div className="text-gray-700">
            <div className="inline-block h-3 border-l-2 border-red-600 mr-2"></div>
            {category.translations.find(t => t.locale === locale)?.title}
          </div>
        </div>
      </div>
    </div>
  </div>
}
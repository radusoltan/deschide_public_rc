import {motion} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import moment from "moment/moment";
import useWindowSize from "@/utils";


export const ArticleItem = ({article, locale}) => {
  moment.locale(locale)
  const { width } = useWindowSize();

  const { category, article_id, translations, images } = article?._source

  const articleLink = `/${locale}/articles/${category.translations.find(t => t.locale === locale).slug}/${article_id}/${translations?.find(t=>t.locale===locale)?.slug}`

  const imageSrc = width < 768 && images ?
      process.env.NEXT_PUBLIC_API_URL + '/' +
      images?.find(i => i.is_main)?.thumbnails.find(th => th.rendition_id === 2).path :
      process.env.NEXT_PUBLIC_API_URL + '/' +
      images?.find(i => i.is_main)?.thumbnails.find(th => th.rendition_id === 1).path

  const imageWidth = width < 768 && images ?
      images?.find(i => i.is_main)?.thumbnails.find(th => th.rendition_id === 2).width :
      images?.find(i => i.is_main)?.thumbnails.find(th => th.rendition_id === 1).width

  const imageHeight = width < 768 && images ?
      images?.find(i => i.is_main)?.thumbnails.find(th => th.rendition_id === 2).height :
      images?.find(i => i.is_main)?.thumbnails.find(th => th.rendition_id === 2).height

  const articleImage = images.length > 0 && <Image
      src={imageSrc}
      width={imageWidth}
      height={imageHeight}
      className="max-w-full w-full mx-auto"
      alt={translations?.find(t => t.locale === locale)?.title}
  />

  const publishedAt = moment(translations?.find(t => t.locale === locale).published_at)
  const oneHourAgo = moment().subtract(1,'hours')


  return <motion.article
      className="flex-shrink max-w-full w-full sm:w-1/2"
      variants={{
        hidden: {y: 20, opacity: 0},
        visible: {
          y: 0,
          opacity: 1
        }
      }}
  >
    <div className="relative">
      <Link
          href={articleLink}>
        {images && articleImage}
      </Link>
      <div
          className="absolute px-4 pt-7 pb-4 bottom-0 w-full bg-gradient-to-t from-slate-900">
        <Link
            href={`/${locale}/articles/${category.translations.find(t => t.locale === locale).slug}/${article_id}/${translations?.find(t => t.locale === locale)?.slug}`}>
          {publishedAt.isAfter(oneHourAgo) && <span className="bg-red-600 text-white p-1 text-sm rounded-md">nou</span>}
          <h2 className="font-title text-lg font-bold capitalize leading-tight text-white mt-2 mb-1">{
            article._source.translations.find(t => t.locale === locale)?.title
          }</h2>
        </Link>
        <div className="pt-1">
          <div className="text-gray-100">
            <div className="inline-block h-3 border-l-2 border-red-600 mr-2"></div>
            {
              category.translations.find(t => t.locale === locale).title
            }
          </div>
        </div>
      </div>
    </div>
  </motion.article>
}
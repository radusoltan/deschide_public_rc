import useSWR from "swr";

export const useArticles = ({locale}) => {

  const {data: lastArticles, error: lastArticlesError, isLoading: lastArticlesLoading} = useSWR(`/home/${locale}/lastArticles`, async ()=>{
    const response = await fetch(`/${locale}/api/lastArticles`)
    return await response.json()
  })

  const {data: liveArticle, error: liveArticleError, isLoading: liveArticleLoading} = useSWR(`/home/${locale}/liveArticle`, async ()=>{
    const response = await fetch(`/${locale}/api/live`)
    return await response.json()
  })

  const {data: specialArticles, error: specialArticlesError, isLoading: specialArticlesLoading} = useSWR(`/home/${locale}/specialArticle`, async ()=>{

    const response = await fetch(`/${locale}/api/specialArticle`)
    return await response.json()

  })

  const {data: featuredArticles, error: featuredArticlesError, isLoading: featuredArticlesLoading} = useSWR(`/home/${locale}`, async ()=>{
    const response = await fetch(`/${locale}/api/featuredArticles`)
    return await response.json()
  })

  const {data: editorials} = useSWR(`/home/${locale}/editorial`, async ()=>{
    const response = await fetch(`/${locale}/articles/api/editorials`)
    return await response.json()
  })

  const {data: videos} = useSWR(`/home/${locale}/videos`, async ()=>{
    const response = await fetch(`/${locale}/articles/api/videos`)
    return await response.json()
  })

  return {
    lastArticles,
    lastArticlesLoading,
    liveArticle,
    liveArticleLoading,
    specialArticles,
    specialArticlesLoading,
    featuredArticles,
    featuredArticlesLoading,
    editorials, videos
  }
}

export const useArticle = ({article, locale, category})=>{

  const {data: doc} = useSWR('/api/article', async ()=>{
    const response = await fetch(`/${locale}/articles/${category}/${article}/api`)
    return await response.json()
  })


  return {
    articleData:  doc
  }
}
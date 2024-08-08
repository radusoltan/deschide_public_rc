"use client"

import useSWR from "swr";

export const useCategories = ({locale, category}) => {

  const {data: categories, isLoading, error} = useSWR('/api/categories',async ()=>{
    const result = await fetch(`/${locale}/api/categories`)
    return result.json()
  })

  return {
    categories,
    isLoading,
  }
}

export const useHomePageCategoryArticles = ({locale, category}) => {

  const {data: categoryArticles} = useSWR(`/api/categoryArticles/${category}`,async ()=>{
    const response = await fetch(`/${locale}/articles/${category}/api/homePageArticles`)
    return response.json()
  })

  return {
    categoryArticles
  }
}

export const useCategoryArticles = ({locale, category, page, size}) => {

  const {data} = useSWR('/api/category/articles',async ()=>{
    const response = await fetch(`/${locale}/articles/${category}/api/articles?page=${page}&size=${size}`)
    return response.json()
  })

  return {
    data
  }
}

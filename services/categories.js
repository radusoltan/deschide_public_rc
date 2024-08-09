"use client"

import useSWR from "swr";

export const useCategories = ({locale}) => {

  const {data: categories, isLoading, error} = useSWR(`/api/categories/${locale}`,async ()=>{
    const result = await fetch(`/${locale}/api/categories`,{ next: { revalidate: 60 }})
    return result.json()
  },{ refreshInterval: 10000 })

  return {
    categories,
    isLoading,
  }
}

export const useHomePageCategoryArticles = ({locale, category}) => {

  const {data: categoryArticles} = useSWR(`/api/categoryArticles/${category}`,async ()=>{
    const response = await fetch(`/${locale}/articles/${category}/api/homePageArticles`,{ next: { revalidate: 60 }})
    return response.json()
  },{ refreshInterval: 10000 })

  return {
    categoryArticles
  }
}

export const useCategoryArticles = ({locale, category, page, size}) => {

  const {data} = useSWR('/api/category/articles',async ()=>{
    const response = await fetch(`/${locale}/articles/${category}/api/articles?page=${page}&size=${size}`,{ next: { revalidate: 60 }})
    return response.json()
  })

  return {
    data
  }
}

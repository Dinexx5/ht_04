import {Request} from "express";
export type RequestWithBody<T> = Request<{},{},T>
export type RequestWithQuery<T> = Request<{},{},{},T>
export type RequestWithParams<T> = Request<T>
export type RequestWithParamsAndBody<T, B> = Request<T,{},B>
export type RequestWithParamsAndQuery<T, B> = Request<T,{},{},B>

export type QueryBlogs = {
    sortDirection: string
    sortBy: string
    pageNumber: number
    pageSize: number
    searchNameTerm: string | null
}

export type QueryPosts = {
    sortDirection: string
    sortBy: string
    pageNumber: number
    pageSize: number
}

export type blogType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string
}

export type postType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export type blogDbType = {
    _id: Object,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string
}

export type postDbType = {
    _id: Object,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export type blogsViewModel = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: blogType[]
}

export type postsViewModel = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: postType[]
}

export type blogsPaginationInputModel = {
    sortDirectionString: string
    sortBy: string
    pageNumber: number
    pageSize: number
    searchNameTerm: string | null
}



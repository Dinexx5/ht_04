export type getPostsForSpecifiedBlogModel = {
    sortBy: string
    sortDirection: string
    pageNumber: number
    pageSize: number
}
export type getAllBlogsQueryModel = {
    sortBy: string
    sortDirection: string
    pageNumber: number
    pageSize: number
    searchNameTerm: string
}
export type createPostForSpecifiedBlogInputModel = {
    title: string
    shortDescription: string
    content: string
}
export type createBlogModel = {
    name: string
    description: string
    websiteUrl:string
}
export type updateBlogModel = {
    name: string
    description: string
    websiteUrl:string
}
export type getAllPostsQueryModel = {
    sortBy: string
    sortDirection: string
    pageNumber: number
    pageSize: number
}
export type createPostInputModel = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}
export type updatePostInputModel = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}

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

export type paramsIdModel = {
    id: string
}

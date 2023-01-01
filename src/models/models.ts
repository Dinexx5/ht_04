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
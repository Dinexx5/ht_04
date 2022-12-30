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



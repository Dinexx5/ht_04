const blogs: blogType[] = []

export type blogType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}

export const blogsRepository = {

    async createBlogs (name: string, description: string, websiteUrl: string): Promise<blogType> {

        const newBlog: blogType  = {
            id: blogs.length.toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        blogs.push(newBlog)
        return newBlog
    },

     async getBlogById (id: string): Promise<blogType | null> {
         let blog = blogs.find(b => b.id === id)
         if (blog) {
             return blog
         } else {
             return null
         }
    },

    async getAllBlogs (): Promise<blogType[]> {
        return blogs
    },

    async deleteBlogById (id: string): Promise<boolean> {
        for (let i = 0; i < blogs.length; i++)  {
            if (blogs[i].id === id) {
                blogs.splice(i, 1);
                return true
            }
        }
        return false
    },

    async UpdateBlogById (id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        let foundBlog: blogType | undefined = blogs.find(b => b.id === id)

        if (!foundBlog) {
            return false
        }
        foundBlog.name = name
        foundBlog.description = description
        foundBlog.websiteUrl = websiteUrl
        return true


    }
 }

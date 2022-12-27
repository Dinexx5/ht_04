import {blogsCollection} from "./db";
import {blogDbType, blogType} from "./types";
import {ObjectId} from "mongodb";


export const blogsRepository = {


    async getAllBlogs(): Promise<blogType[]> {

        let blogsDb = await blogsCollection.find({}).toArray()
        return blogsDb.map((blog: blogDbType) => ({
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            id: blog._id.toString()
        }))
    },


    async createBlogs(name: string, description: string, websiteUrl: string): Promise<blogType> {
        const newDbBlog: blogDbType = {
            _id: new ObjectId(),
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            createdAt: new Date().toISOString()
        }
        await blogsCollection.insertOne(newDbBlog)
        return {
            name: newDbBlog.name,
            description: newDbBlog.description,
            websiteUrl: newDbBlog.websiteUrl,
            createdAt: newDbBlog.createdAt,
            id: newDbBlog._id.toString()
        }
    },


    async getBlogById(id: string): Promise<blogType | null> {
        if (!ObjectId.isValid(id)) {
            return null
        }

        let _id = new ObjectId(id)
        let blog: blogDbType | null = await blogsCollection.findOne({_id: _id})

        if (!blog) {
            return null
        }

        return {
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            id: blog._id.toString()
        }
    },


    async deleteBlogById(id: string): Promise<boolean> {
        if (ObjectId.isValid(id)) {
            let _id = new ObjectId(id)
            let result = await blogsCollection.deleteOne({_id: _id})
            return result.deletedCount === 1
        }
        return false
    },


    async UpdateBlogById(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        if (ObjectId.isValid(id)) {
            let _id = new ObjectId(id)
            let result = await blogsCollection.updateOne({_id: _id}, {
                $set: {
                    name: name,
                    description: description,
                    websiteUrl: websiteUrl
                }
            })
            return result.matchedCount === 1
        }
        return false


    }
}

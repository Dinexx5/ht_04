import {blogDbType, blogType} from "./types";
import {blogsCollection} from "./db";
import {ObjectId} from "mongodb";

export const blogsQueryRepository = {


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

}
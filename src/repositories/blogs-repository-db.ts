import {blogsCollection} from "./db";
import {blogDbType, blogType} from "./types";
import {ObjectId} from "mongodb";


export const blogsRepository = {

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

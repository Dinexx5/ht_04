import {blogsRepository} from "./blogs-repository-db";
import {postsCollection} from "./db";
import {blogType, postDbType, postType} from "./types";
import {ObjectId} from "mongodb";


export const postsRepository = {

    async createPost (title: string, shortDescription: string, content: string, blogId: string): Promise<postType> {
        let foundBlog = await blogsRepository.getBlogById(blogId)
        const newDbPost: postDbType  = {
            _id: new ObjectId(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: foundBlog!.name,
            createdAt: new Date().toISOString()
        }
        await postsCollection.insertOne(newDbPost)
        return {
            id: newDbPost._id.toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: foundBlog!.name,
            createdAt: new Date().toISOString()
        }
    },



    async getPostById (id: string): Promise<postType | null> {
        if (!ObjectId.isValid(id)) {
            return null
        }

        let _id = new ObjectId(id)
        let post: postDbType | null = await postsCollection.findOne({_id: _id})
        if (!post) {
            return null
        }

        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        }
    },



    async getAllPosts (): Promise<postType[]> {

        let postsDb = await postsCollection.find({}).toArray()
        return postsDb.map((post: postDbType) => ({
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        }))
    },



    async deletePostById (id: string): Promise<boolean> {
        if (!ObjectId.isValid(id)) {
            return false
        }
        let _id = new ObjectId(id)
        let result = await postsCollection.deleteOne({_id: _id})
        return result.deletedCount === 1
    },




    async UpdatePostById (id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        if (!ObjectId.isValid(id)) {
            return false
        }
        let foundBlog: blogType | null = await blogsRepository.getBlogById(blogId)
        if (!foundBlog) {
            return false
        }
        let _id = new ObjectId(id)
        let result = await postsCollection.updateOne({_id: _id}, {$set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId}})
        return result.matchedCount === 1
    }
}
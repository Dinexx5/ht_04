import {postsCollection} from "./db";
import {ObjectId} from "mongodb";
import {blogsQueryRepository} from "./blogs-query-repository";
import {
    blogType,
    createPostForSpecifiedBlogInputModel,
    createPostInputModel, postDbType,
    postType,
    updatePostInputModel
} from "../models/models";


export const postsRepository = {

    async createPost (body: createPostInputModel): Promise<postType> {
        const {title, shortDescription, content, blogId} = body
        let foundBlog = await blogsQueryRepository.getBlogById(blogId)
        const newDbPost: postDbType  = {
            _id: new ObjectId(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: foundBlog!.name,
            createdAt: foundBlog!.createdAt
        }
        await postsCollection.insertOne(newDbPost)
        return {
            id: newDbPost._id.toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: foundBlog!.name,
            createdAt: foundBlog!.createdAt
        }
    },

    async createPostForSpecifiedBlog (body: createPostForSpecifiedBlogInputModel, blogId: string): Promise<postType> {
        const {title, shortDescription, content} = body
        let foundBlog = await blogsQueryRepository.getBlogById(blogId)
        const newDbPost: postDbType  = {
            _id: new ObjectId(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: foundBlog!.name,
            createdAt: foundBlog!.createdAt
        }
        await postsCollection.insertOne(newDbPost)
        return {
            id: newDbPost._id.toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: foundBlog!.name,
            createdAt: foundBlog!.createdAt
        }
    },


    async deletePostById (id: string): Promise<boolean> {
        if (!ObjectId.isValid(id)) {
            return false
        }
        let _id = new ObjectId(id)
        let result = await postsCollection.deleteOne({_id: _id})
        return result.deletedCount === 1
    },




    async UpdatePostById (id: string, body: updatePostInputModel): Promise<boolean> {
        const {title, shortDescription, content, blogId} = body
        if (!ObjectId.isValid(id)) {
            return false
        }
        let foundBlog: blogType | null = await blogsQueryRepository.getBlogById(blogId)
        if (!foundBlog) {
            return false
        }
        let _id = new ObjectId(id)
        let result = await postsCollection.updateOne({_id: _id}, {$set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId}})
        return result.matchedCount === 1
    }
}
import {postsCollection} from "./db";
import {postDbType, postType} from "./types";
import {ObjectId} from "mongodb";


export const postsQueryRepository = {

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

}
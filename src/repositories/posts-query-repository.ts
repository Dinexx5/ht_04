import {blogsCollection, postsCollection} from "./db";
import {blogDbType, postDbType, postsViewModel, postType} from "./types";
import {ObjectId} from "mongodb";


export const postsQueryRepository = {

    async getAllPosts (sortDirectionString: string, sortBy: string, pageNumber: number, pageSize: number,): Promise<postsViewModel> {

        const sortDirectionNumber: 1 | -1 = sortDirectionString === "desc" ? -1 : 1;
        const skippedBlogsNumber = (pageNumber-1)*pageSize
        const countAll = await postsCollection.countDocuments()

        let postsDb = await postsCollection
            .find({})
            .sort( {[sortBy]: sortDirectionNumber} )
            .skip(skippedBlogsNumber)
            .limit(pageSize)
            .toArray()
        const postsView = postsDb.map((post: postDbType) => ({
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        }))
        return {
            pagesCount: Math.ceil(countAll/pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: countAll,
            items: postsView
        }
    },

    async getPostForBlog (sortDirectionString: string, sortBy: string, pageNumber: number, pageSize: number, blogId: string): Promise<postsViewModel> {

        const sortDirectionNumber: 1 | -1 = sortDirectionString === "desc" ? -1 : 1;
        const skippedPostsNumber = (pageNumber-1)*pageSize
        const countAll = await postsCollection.countDocuments({blogId: {$regex: blogId} })

        let postsDb = await postsCollection
            .find({blogId: {$regex: blogId} })
            .sort( {[sortBy]: sortDirectionNumber, title: -1, id: -1} )
            .skip(skippedPostsNumber)
            .limit(pageSize)
            .toArray()

        const postsView = postsDb.map((post: postDbType) => ({
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        }))
        return {
            pagesCount: Math.ceil(countAll/pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: countAll,
            items: postsView
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

}
import {postsRepository} from "../repositories/posts-repository-db";
import {postType} from "../repositories/types";
import {createPostForSpecifiedBlogInputModel, createPostInputModel, updatePostInputModel} from "../models/models";


export const postsService = {


    async createPost(body: createPostInputModel): Promise<postType> {
        return await postsRepository.createPost(body)
    },

    async createPostForSpecifiedBlog (body: createPostForSpecifiedBlogInputModel, blogId: string): Promise<postType> {
        return await postsRepository.createPostForSpecifiedBlog(body, blogId)
    },

    async deletePostById(id: string): Promise<boolean> {
        return await postsRepository.deletePostById(id)
    },


    async UpdatePostById(id: string, body: updatePostInputModel): Promise<boolean> {
        return await postsRepository.UpdatePostById(id, body)


    }
}
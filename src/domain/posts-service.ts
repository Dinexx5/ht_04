import {postsRepository} from "../repositories/posts-repository-db";
import {postType} from "../repositories/types";
import {blogsQueryRepository} from "../repositories/blogs-query-repository";



export const postsService = {


    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<postType> {
        return await postsRepository.createPost(title, shortDescription, content, blogId)
    },


    async deletePostById(id: string): Promise<boolean> {
        return await postsRepository.deletePostById(id)
    },


    async UpdatePostById(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        return await postsRepository.UpdatePostById(id, title, shortDescription, content, blogId)


    }
}
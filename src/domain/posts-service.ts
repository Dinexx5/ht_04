import {postsRepository} from "../repositories/posts-repository-db";
import {postType} from "../repositories/types";



export const postsService = {


    async getAllPosts(): Promise<postType[]> {
        return await postsRepository.getAllPosts()
    },


    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<postType> {
        return await postsRepository.createPost(title, shortDescription, content, blogId)
    },


    async getPostById(id: string): Promise<postType | null> {

        return await postsRepository.getPostById(id)
    },


    async deletePostById(id: string): Promise<boolean> {
        return await postsRepository.deletePostById(id)
    },


    async UpdatePostById(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        return await postsRepository.UpdatePostById(id, title, shortDescription, content, blogId)


    }
}
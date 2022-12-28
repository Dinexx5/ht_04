
import {blogsRepository} from "../repositories/blogs-repository-db";
import {blogType} from "../repositories/types";


export const blogsService = {


    async createBlogs(name: string, description: string, websiteUrl: string): Promise<blogType> {
        return await blogsRepository.createBlogs(name, description, websiteUrl)
    },


    async deleteBlogById(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlogById(id)
    },


    async UpdateBlogById(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        return await blogsRepository.UpdateBlogById(id, name, description, websiteUrl)


    }
}
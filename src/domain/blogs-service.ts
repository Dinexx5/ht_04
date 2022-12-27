
import {blogsRepository} from "../repositories/blogs-repository-db";
import {blogType} from "../repositories/types";


export const blogsService = {


    async getAllBlogs(): Promise<blogType[]> {
        return await blogsRepository.getAllBlogs()
    },


    async createBlogs(name: string, description: string, websiteUrl: string): Promise<blogType> {
        return await blogsRepository.createBlogs(name, description, websiteUrl)
    },


    async getBlogById(id: string): Promise<blogType | null> {

        return await blogsRepository.getBlogById(id)
    },


    async deleteBlogById(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlogById(id)
    },


    async UpdateBlogById(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        return await blogsRepository.UpdateBlogById(id, name, description, websiteUrl)


    }
}
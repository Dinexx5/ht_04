
import {blogsRepository} from "../repositories/blogs-repository-db";
import {blogType} from "../repositories/types";
import {createBlogModel, updateBlogModel} from "../models/models";


export const blogsService = {


    async createBlogs(body: createBlogModel): Promise<blogType> {
        return await blogsRepository.createBlogs(body)
    },


    async deleteBlogById(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlogById(id)
    },


    async UpdateBlogById(id: string, body: updateBlogModel): Promise<boolean> {
        return await blogsRepository.UpdateBlogById(id, body)


    }
}
import {blogDbType, blogsViewModel, blogType} from "./types";
import {blogsCollection} from "./db";
import {ObjectId} from "mongodb";


export const blogsQueryRepository = {


    async getAllBlogs(sortDirectionString: string, sortBy: string, pageNumber: number, pageSize: number, searchNameTerm: string | null): Promise<blogsViewModel> {
        const sortDirectionNumber: 1 | -1 = sortDirectionString === "desc" ? -1 : 1;
        const skippedBlogsNumber = (pageNumber-1)*pageSize

        if (searchNameTerm){
            const countAllWithSearchTerm = await blogsCollection.countDocuments({name: {$regex: searchNameTerm, $options: 'i' } })
            let blogsDb = await blogsCollection
                .find( {name: {$regex: searchNameTerm, $options: 'i' } }  )
                .sort( {[sortBy]: sortDirectionNumber} )
                .skip(skippedBlogsNumber)
                .limit(pageSize)
                .toArray()

            const blogsView = blogsDb.map((blog: blogDbType) => ({
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt,
                id: blog._id.toString()
            }))
            return {
                pagesCount: countAllWithSearchTerm/pageSize,
                page: pageNumber,
                pageSize: pageSize,
                totalCount: countAllWithSearchTerm,
                items: blogsView
            }
        }

        const countAll = await blogsCollection.countDocuments()
        let blogsDb = await blogsCollection
            .find( { } )
            .sort( {[sortBy]: sortDirectionNumber} )
            .skip(skippedBlogsNumber)
            .limit(pageSize)
            .toArray()
        const blogsView = blogsDb.map((blog: blogDbType) => ({
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            id: blog._id.toString()
        }))
        return {
            pagesCount: countAll/pageSize,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: countAll,
            items: blogsView
        }

    },

    async getBlogById(id: string): Promise<blogType | null> {
        if (!ObjectId.isValid(id)) {
            return null
        }

        let _id = new ObjectId(id)
        let blog: blogDbType | null = await blogsCollection.findOne({_id: _id})

        if (!blog) {
            return null
        }

        return {
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            id: blog._id.toString()
        }
    },

}
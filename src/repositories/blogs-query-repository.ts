
import {blogsCollection} from "./db";
import {ObjectId} from "mongodb";
import {blogDbType, blogsViewModel, blogType, QueryBlogs} from "../models/models";

function blogsMapperToBlogType (blog: blogDbType): blogType {
    return  {
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        id: blog._id.toString()
    }

}

export const blogsQueryRepository = {


    async getAllBlogs(query: QueryBlogs): Promise<blogsViewModel> {

        const {sortDirection = "desc", sortBy = "createdAt", pageNumber = 1, pageSize = 10, searchNameTerm = null} = query
        const sortDirectionNumber: 1 | -1 = sortDirection === "desc" ? -1 : 1;
        const skippedBlogsNumber = (+pageNumber-1)*+pageSize

        if (searchNameTerm){
            const countAllWithSearchTerm = await blogsCollection.countDocuments({name: {$regex: searchNameTerm, $options: 'i' } })
            const blogsDb: blogDbType[] = await blogsCollection
                .find( {name: {$regex: searchNameTerm, $options: 'i' } }  )
                .sort( {[sortBy]: sortDirectionNumber} )
                .skip(skippedBlogsNumber)
                .limit(+pageSize)
                .toArray()

            const blogsView = blogsDb.map(blogsMapperToBlogType)
            return {
                pagesCount: Math.ceil(countAllWithSearchTerm/pageSize),
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount: countAllWithSearchTerm,
                items: blogsView
            }

        }

        const countAll = await blogsCollection.countDocuments()
        let blogsDb = await blogsCollection
            .find( { } )
            .sort( {[sortBy]: sortDirectionNumber} )
            .skip(skippedBlogsNumber)
            .limit(+pageSize)
            .toArray()

        const blogsView = blogsDb.map(blogsMapperToBlogType)
        return {
            pagesCount: Math.ceil(countAll/pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
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

        return blogsMapperToBlogType(blog)
    },

}
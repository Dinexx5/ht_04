import {Request, Response, Router} from "express";
import {blogsService} from "../domain/blogs-service";
import {
    basicAuthorisation, contentValidation,
    descriptionValidation,
    inputValidationMiddleware,
    nameValidation, shortDescriptionValidation,
    titleValidation,
    websiteUrlValidation
} from "../middlewares/input-validation";
import {
    blogType,
    blogsViewModel,
    postType,
    postsViewModel,
    RequestWithQuery,
    RequestWithParams, RequestWithBody, RequestWithParamsAndBody
} from "../repositories/types";
import {blogsQueryRepository} from "../repositories/blogs-query-repository";
import {postsService} from "../domain/posts-service";
import {postsQueryRepository} from "../repositories/posts-query-repository";
import {
    createBlogModel,
    createPostForSpecifiedBlogInputModel,
    getAllBlogsQueryModel,
    getPostsForSpecifiedBlogModel, updateBlogModel
} from "../models/models";



export const blogsRouter = Router({})


blogsRouter.get('/', async (req: RequestWithQuery<getAllBlogsQueryModel>, res: Response<blogsViewModel>) => {

    let sortBy: string = req.query.sortBy ? req.query.sortBy.toString() : "createdAt"

    let sortDirectionString: string = req.query.sortDirection ? req.query.sortDirection.toString() : "desc"

    let pageNumber: number = req.query.pageNumber ? +req.query.pageNumber : 1

    let pageSize: number = req.query.pageSize ? +req.query.pageSize : 10

    let searchNameTerm: string | null = req.query.searchNameTerm ? req.query.searchNameTerm.toString() : null

    const returnedBlogs: blogsViewModel = await blogsQueryRepository.getAllBlogs(sortDirectionString, sortBy, pageNumber, pageSize, searchNameTerm)

    res.status(200).send(returnedBlogs)
})

blogsRouter.get('/:id', async (req: RequestWithParams<{id:string}>, res: Response) => {
    const blog: blogType | null = await blogsQueryRepository.getBlogById(req.params.id)
    if (!blog) {
        res.send(404)
    } else {
        res.send(blog)
    }
})

blogsRouter.get('/:id/posts', async (req: RequestWithParamsAndBody<{id:string}, getPostsForSpecifiedBlogModel>, res: Response) => {
    let sortBy: string = req.query.sortBy ? req.query.sortBy.toString() : "createdAt"

    let sortDirectionString: string = req.query.sortDirection ? req.query.sortDirection.toString() : "desc"

    let pageNumber: number = req.query.pageNumber ? +req.query.pageNumber : 1

    let pageSize: number = req.query.pageSize ? +req.query.pageSize : 10

    let blogId = req.params.id

    const blog: blogType | null = await blogsQueryRepository.getBlogById(req.params.id)
    if (!blog) {
        res.send(404)
        return
    }

    const returnedPosts: postsViewModel = await postsQueryRepository.getPostForBlog(sortDirectionString, sortBy, pageNumber, pageSize, blogId)

    res.status(200).send(returnedPosts)

    })


blogsRouter.post('/:id/posts',
        basicAuthorisation,
        titleValidation,
        shortDescriptionValidation,
        contentValidation,
        inputValidationMiddleware,
        async (req: RequestWithParamsAndBody<{id:string}, createPostForSpecifiedBlogInputModel>, res: Response) => {

            const {title, shortDescription, content} = req.body
            const blogId = req.params.id
            const blog: blogType | null = await blogsQueryRepository.getBlogById(blogId)
            if (!blog) {
                res.send(404)
                return
            }

            const newPost: postType = await postsService.createPost(title, shortDescription, content, blogId)
            res.status(201).send(newPost)

})

blogsRouter.post('/',
    basicAuthorisation,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    async (req: RequestWithBody<createBlogModel>, res: Response<blogType>) => {

        const {name, description, websiteUrl} = req.body
        const newBlog: blogType = await blogsService.createBlogs(name, description, websiteUrl)
        res.status(201).send(newBlog)
    })

blogsRouter.delete('/:id',
    basicAuthorisation,
    async (req: RequestWithParams<{id:string}>, res: Response) => {
    const isDeleted: boolean = await blogsService.deleteBlogById(req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})

blogsRouter.put('/:id',
    basicAuthorisation,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    async (req: RequestWithParamsAndBody<{id:string}, updateBlogModel>, res: Response) => {
        const id = req.params.id

        const {name, description, websiteUrl} = req.body

        let isUpdated: boolean = await blogsService.UpdateBlogById(id, name, description, websiteUrl)

        if (isUpdated) {
            res.send(204)
        } else {
            res.send(404)

        }
    })
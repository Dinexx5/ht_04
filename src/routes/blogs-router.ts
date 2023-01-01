import {Response, Router} from "express";
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
    RequestWithParams, RequestWithBody, RequestWithParamsAndBody, RequestWithParamsAndQuery
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


    const returnedBlogs: blogsViewModel = await blogsQueryRepository.getAllBlogs(req.query)

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

blogsRouter.get('/:id/posts', async (req: RequestWithParamsAndQuery<{id:string}, getPostsForSpecifiedBlogModel>, res: Response) => {

    let blogId = req.params.id

    const blog: blogType | null = await blogsQueryRepository.getBlogById(req.params.id)
    if (!blog) {
        res.send(404)
        return
    }

    const returnedPosts: postsViewModel = await postsQueryRepository.getPostForBlog(blogId, req.query)

    res.status(200).send(returnedPosts)

    })


blogsRouter.post('/:id/posts',
        basicAuthorisation,
        titleValidation,
        shortDescriptionValidation,
        contentValidation,
        inputValidationMiddleware,
        async (req: RequestWithParamsAndBody<{id:string}, createPostForSpecifiedBlogInputModel>, res: Response) => {

            const blogId = req.params.id
            const blog: blogType | null = await blogsQueryRepository.getBlogById(blogId)
            if (!blog) {
                res.send(404)
                return
            }

            const newPost: postType = await postsService.createPostForSpecifiedBlog(req.body, blogId)
            res.status(201).send(newPost)

})

blogsRouter.post('/',
    basicAuthorisation,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    async (req: RequestWithBody<createBlogModel>, res: Response<blogType>) => {


        const newBlog: blogType = await blogsService.createBlogs(req.body)
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

        let isUpdated: boolean = await blogsService.UpdateBlogById(req.params.id, req.body)

        if (isUpdated) {
            res.send(204)
        } else {
            res.send(404)

        }
    })
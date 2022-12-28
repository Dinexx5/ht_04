import {Request, Response, Router} from "express";
import {blogsService} from "../domain/blogs-service";
import {basicAuthorisation, descriptionValidation, inputValidationMiddleware, nameValidation, websiteUrlValidation} from "../middlewares/input-validation";
import {blogType} from "../repositories/types";
import {blogsQueryRepository} from "../repositories/blogs-query-repository";


export const blogsRouter = Router({})


blogsRouter.get('/', async (req: Request, res: Response) => {
    const blogs: blogType[] = await blogsQueryRepository.getAllBlogs()
    res.status(200).send(blogs)
})

blogsRouter.get('/:id', async (req: Request, res: Response) => {
    const blog: blogType | null = await blogsQueryRepository.getBlogById(req.params.id)
    if (!blog) {
        res.send(404)
    } else {
        res.send(blog)
    }
})

blogsRouter.post('/',
    basicAuthorisation,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {

        const {name, description, websiteUrl} = req.body
        const newBlog: blogType = await blogsService.createBlogs(name, description, websiteUrl)
        res.status(201).send(newBlog)
    })

blogsRouter.delete('/:id',
    basicAuthorisation,
    async (req: Request, res: Response) => {
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
    async (req: Request, res: Response) => {
        const id = req.params.id

        const {name, description, websiteUrl} = req.body

        let isUpdated: boolean = await blogsService.UpdateBlogById(id, name, description, websiteUrl)

        if (isUpdated) {
            res.send(204)
        } else {
            res.send(404)

        }
    })
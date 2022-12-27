import {Request, Response, Router} from "express"
import {basicAuthorisation, blogIdlValidation, contentValidation, inputValidationMiddleware, shortDescriptionValidation, titleValidation} from "../middlewares/input-validation";
import {postsRepository} from "../repositories/posts-repository-db";
import {blogsRepository} from "../repositories/blogs-repository-db";
import {blogType, postType} from "../repositories/types";




export const postsRouter = Router({})



postsRouter.get('/', async (req: Request, res: Response) => {
    const posts: postType[] = await postsRepository.getAllPosts()
    res.status(200).send(posts)
})

postsRouter.get('/:id', async (req: Request, res: Response) => {
    let post: postType | null = await postsRepository.getPostById(req.params.id)
    if (!post) {
        res.send(404)
    } else {
        res.send(post)
    }
})

postsRouter.post('/',
    basicAuthorisation,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdlValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {

        const {title, shortDescription, content, blogId} = req.body
        // const foundBlog: blogType | null = await blogsRepository.getBlogById(blogId)
        // if (!foundBlog) {
        //    return res.send(404)
        // } else {
            const newPost: postType = await postsRepository.createPost(title, shortDescription, content, blogId)
            res.status(201).send(newPost)
        // }

    })

postsRouter.delete('/:id',
    basicAuthorisation,
    async (req: Request, res: Response) => {
    const isDeleted: boolean = await postsRepository.deletePostById(req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})

postsRouter.put('/:id',
    basicAuthorisation,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdlValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const id = req.params.id
        const {title, shortDescription, content, blogId} = req.body

        let isUpdated: boolean = await postsRepository.UpdatePostById(id, title, shortDescription, content, blogId)

        if (isUpdated) {
            res.send(204)
        } else {
            res.send(404)

        }
    })

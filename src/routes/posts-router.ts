import {Request, Response, Router} from "express"
import {basicAuthorisation, blogIdlValidation, contentValidation, inputValidationMiddleware, shortDescriptionValidation, titleValidation} from "../middlewares/input-validation";
import {postsService} from "../domain/posts-service";
import {postType} from "../repositories/types";
import {postsQueryRepository} from "../repositories/posts-query-repository";




export const postsRouter = Router({})



postsRouter.get('/', async (req: Request, res: Response) => {
    const posts: postType[] = await postsQueryRepository.getAllPosts()
    res.status(200).send(posts)
})

postsRouter.get('/:id', async (req: Request, res: Response) => {
    let post: postType | null = await postsQueryRepository.getPostById(req.params.id)
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

        const newPost: postType = await postsService.createPost(title, shortDescription, content, blogId)
        res.status(201).send(newPost)


    })

postsRouter.delete('/:id',
    basicAuthorisation,
    async (req: Request, res: Response) => {
    const isDeleted: boolean = await postsService.deletePostById(req.params.id)
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

        let isUpdated: boolean = await postsService.UpdatePostById(id, title, shortDescription, content, blogId)

        if (isUpdated) {
            res.send(204)
        } else {
            res.send(404)

        }
    })

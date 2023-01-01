import {Response, Router} from "express"
import {basicAuthorisation, blogIdlValidation, contentValidation, inputValidationMiddleware, shortDescriptionValidation, titleValidation} from "../middlewares/input-validation";
import {postsService} from "../domain/posts-service";
import {
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery
} from "../repositories/types";
import {postsQueryRepository} from "../repositories/posts-query-repository";
import {
    createPostInputModel,
    getAllPostsQueryModel, paramsIdModel,
    postsViewModel,
    postType,
    updatePostInputModel
} from "../models/models";




export const postsRouter = Router({})



postsRouter.get('/', async (req: RequestWithQuery<getAllPostsQueryModel>, res: Response<postsViewModel>) => {

    const returnedPosts: postsViewModel = await postsQueryRepository.getAllPosts(req.query)
    res.status(200).send(returnedPosts)
})

postsRouter.get('/:id', async (req: RequestWithParams<paramsIdModel>, res: Response) => {
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
    async (req: RequestWithBody<createPostInputModel>, res: Response<postType>) => {

        const newPost: postType = await postsService.createPost(req.body)
        res.status(201).send(newPost)


    })

postsRouter.delete('/:id',
    basicAuthorisation,
    async (req: RequestWithParams<paramsIdModel>, res: Response) => {
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
    async (req: RequestWithParamsAndBody<paramsIdModel, updatePostInputModel>, res: Response) => {

        let isUpdated: boolean = await postsService.UpdatePostById(req.params.id, req.body)

        if (isUpdated) {
            res.send(204)
        } else {
            res.send(404)

        }
    })

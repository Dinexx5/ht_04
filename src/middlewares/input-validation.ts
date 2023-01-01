import {NextFunction, Request, Response} from "express";
import {body, validationResult} from "express-validator";
import {blogsQueryRepository} from "../repositories/blogs-query-repository";
import {blogType} from "../models/models";

export const basicAuthorisation = (req: Request, res: Response, next: NextFunction) => {
    const loginPass = req.headers.authorization;
    if (loginPass === "Basic YWRtaW46cXdlcnR5") {
        next()
    } else {
        return res.status(401).end()
    }
}

const myValidationResult = validationResult.withDefaults({
    formatter: error => {
        return {
            "message": error.msg,
            "field": error.param
        };
    },
});

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errorsMessages: errors.array() });
    } else {
        next()
    }
}

//blogs validation
export const nameValidation = body('name').trim().isLength({max: 15}).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string')
export const descriptionValidation = body('description').trim().isLength({max: 500}).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string')
export const websiteUrlValidation = body('websiteUrl').trim().isURL().withMessage('Not a Url')

//posts validation

export const titleValidation = body('title').trim().isLength({max: 30}).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string title')
export const shortDescriptionValidation = body('shortDescription').trim().isLength({max: 100}).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string desc')
export const contentValidation = body('content').trim().isLength({max: 1000}).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string content')
export const blogIdlValidation = body('blogId').trim().not().isEmpty().withMessage('Not a string blogId').isLength({max: 30})
    .withMessage('Incorrect length of blogId')
    .custom(async (value) => {
        const blog: blogType | null = await blogsQueryRepository.getBlogById(value)
        if (!blog) {
            throw new Error('blog id does not exist');
        }
        return true

    })



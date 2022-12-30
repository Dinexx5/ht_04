"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogIdlValidation = exports.contentValidation = exports.shortDescriptionValidation = exports.titleValidation = exports.websiteUrlValidation = exports.descriptionValidation = exports.nameValidation = exports.inputValidationMiddleware = exports.basicAuthorisation = void 0;
const express_validator_1 = require("express-validator");
const blogs_query_repository_1 = require("../repositories/blogs-query-repository");
const basicAuthorisation = (req, res, next) => {
    const loginPass = req.headers.authorization;
    if (loginPass === "Basic YWRtaW46cXdlcnR5") {
        next();
    }
    else {
        return res.status(401).end();
    }
};
exports.basicAuthorisation = basicAuthorisation;
const myValidationResult = express_validator_1.validationResult.withDefaults({
    formatter: error => {
        return {
            "message": error.msg,
            "field": error.param
        };
    },
});
const inputValidationMiddleware = (req, res, next) => {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errorsMessages: errors.array() });
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
//blogs validation
exports.nameValidation = (0, express_validator_1.body)('name').trim().isLength({ max: 15 }).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string');
exports.descriptionValidation = (0, express_validator_1.body)('description').trim().isLength({ max: 500 }).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string');
exports.websiteUrlValidation = (0, express_validator_1.body)('websiteUrl').trim().isURL().withMessage('Not a Url');
//posts validation
exports.titleValidation = (0, express_validator_1.body)('title').trim().isLength({ max: 30 }).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string title');
exports.shortDescriptionValidation = (0, express_validator_1.body)('shortDescription').trim().isLength({ max: 100 }).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string desc');
exports.contentValidation = (0, express_validator_1.body)('content').trim().isLength({ max: 1000 }).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string content');
exports.blogIdlValidation = (0, express_validator_1.body)('blogId').trim().not().isEmpty().withMessage('Not a string blogId').isLength({ max: 30 })
    .withMessage('Incorrect length of blogId')
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_query_repository_1.blogsQueryRepository.getBlogById(value);
    if (!blog) {
        throw new Error('blog id does not exist');
    }
    return true;
}));

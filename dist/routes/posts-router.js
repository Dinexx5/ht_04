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
exports.postsRouter = void 0;
const express_1 = require("express");
const input_validation_1 = require("../middlewares/input-validation");
const posts_repository_db_1 = require("../repositories/posts-repository-db");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield posts_repository_db_1.postsRepository.getAllPosts();
    res.status(200).send(posts);
}));
exports.postsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let post = yield posts_repository_db_1.postsRepository.getPostById(req.params.id);
    if (!post) {
        res.send(404);
    }
    else {
        res.send(post);
    }
}));
exports.postsRouter.post('/', input_validation_1.basicAuthorisation, input_validation_1.titleValidation, input_validation_1.shortDescriptionValidation, input_validation_1.contentValidation, input_validation_1.blogIdlValidation, input_validation_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, shortDescription, content, blogId } = req.body;
    // const foundBlog: blogType | null = await blogsRepository.getBlogById(blogId)
    // if (!foundBlog) {
    //    return res.send(404)
    // } else {
    const newPost = yield posts_repository_db_1.postsRepository.createPost(title, shortDescription, content, blogId);
    res.status(201).send(newPost);
    // }
}));
exports.postsRouter.delete('/:id', input_validation_1.basicAuthorisation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield posts_repository_db_1.postsRepository.deletePostById(req.params.id);
    if (isDeleted) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.postsRouter.put('/:id', input_validation_1.basicAuthorisation, input_validation_1.titleValidation, input_validation_1.shortDescriptionValidation, input_validation_1.contentValidation, input_validation_1.blogIdlValidation, input_validation_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, shortDescription, content, blogId } = req.body;
    let isUpdated = yield posts_repository_db_1.postsRepository.UpdatePostById(id, title, shortDescription, content, blogId);
    if (isUpdated) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
